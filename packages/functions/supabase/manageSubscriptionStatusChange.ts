import { stripe } from '../stripe'
import { getISOString } from '../utils/getISOString'
import { copyBillingDetailsToCustomer } from './copyBillingDetailsToCustomer'
import { supabaseAdmin } from './supabaseAdmin'

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false,
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  // if no customer was returned and we are updating or deleting a subscription, throw an error
  if (noCustomerError) {
    throw noCustomerError
  }

  const uuid = customerData?.id

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
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at ? getISOString(subscription.cancel_at * 1000) : null,
    canceled_at: subscription.canceled_at ? getISOString(subscription.canceled_at * 1000) : null,
    current_period_start: getISOString(subscription.current_period_start * 1000),
    current_period_end: getISOString(subscription.current_period_end * 1000),
    created: getISOString(subscription.created * 1000),
    ended_at: subscription.ended_at ? getISOString(subscription.ended_at * 1000) : null,
    trial_start: subscription.trial_start ? getISOString(subscription.trial_start * 1000) : null,
    trial_end: subscription.trial_end ? getISOString(subscription.trial_end * 1000) : null,
    // @ts-expect-error quantity does exist on subscription
    quantity: subscription.quantity,
  }

  const { error } = await supabaseAdmin.from('subscriptions').upsert([subscriptionData])

  if (error) {
    throw error
  }

  console.log(`Inserted/updated subscription [${subscription.id}] for user [${uuid}]`)

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid) {
    await copyBillingDetailsToCustomer(
      uuid,
      // @ts-expect-error FIXME:
      subscription.default_payment_method,
    )
  }
}
