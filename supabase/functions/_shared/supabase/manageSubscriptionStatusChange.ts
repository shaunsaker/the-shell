import { stripe } from '../stripe/index.ts'
import { copyBillingDetailsToCustomer } from './copyBillingDetailsToCustomer.ts'
import { supabaseAdmin } from './supabaseAdmin.ts'

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
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
    cancel_at: subscription.cancel_at ? subscription.cancel_at * 1000 : null,
    canceled_at: subscription.canceled_at ? subscription.canceled_at * 1000 : null,
    current_period_start: subscription.current_period_start * 1000,
    current_period_end: subscription.current_period_end * 1000,
    created: subscription.created * 1000,
    ended_at: subscription.ended_at ? subscription.ended_at * 1000 : null,
    trial_start: subscription.trial_start ? subscription.trial_start * 1000 : null,
    trial_end: subscription.trial_end ? subscription.trial_end * 1000 : null,
  }

  const { error } = await supabaseAdmin.from('subscriptions').upsert([subscriptionData])

  if (error) {
    throw error
  }

  console.log(`Inserted/updated subscription [${subscription.id}] for user [${uuid}]`)

  console.log(createAction, subscription.default_payment_method, uuid)

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid) {
    await copyBillingDetailsToCustomer(uuid, subscription.default_payment_method as any)
  }
}
