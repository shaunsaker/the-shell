import dayjs from 'https://deno.land/x/deno_dayjs@v0.3.0/mod.ts'

import { stripe } from '../stripe/index.ts'
import { copyBillingDetailsToCustomer } from './copyBillingDetailsToCustomer.ts'
import { supabase } from './index.ts'

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabase
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  // if no customer was returned and we are updating or deleting a subscription, throw an error
  if (noCustomerError) throw noCustomerError

  const uuid = customerData?.id

  // @ts-expect-error FIXME: stripe types in Deno are currently broken
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  })

  // Upsert the latest status of the subscription object.
  const subscriptionData = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at ? dayjs(subscription.cancel_at * 1000).toISOString() : null,
    canceled_at: subscription.canceled_at ? dayjs(subscription.canceled_at * 1000).toISOString() : null,
    current_period_start: dayjs(subscription.current_period_start * 1000).toISOString(),
    current_period_end: dayjs(subscription.current_period_end * 1000).toISOString(),
    created: dayjs(subscription.created * 1000).toISOString(),
    ended_at: subscription.ended_at ? dayjs(subscription.ended_at * 1000).toISOString() : null,
    trial_start: subscription.trial_start ? dayjs(subscription.trial_start * 1000).toISOString() : null,
    trial_end: subscription.trial_end ? dayjs(subscription.trial_end * 1000).toISOString() : null,
  }

  const { error } = await supabase.from('subscriptions').upsert([subscriptionData])

  if (error) {
    throw error
  }

  console.log(`Inserted/updated subscription [${subscription.id}] for user [${uuid}]`)

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid) {
    await copyBillingDetailsToCustomer(uuid, subscription.default_payment_method as any)
  }
}