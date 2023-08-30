import { copyBillingDetailsToCustomer } from './copyBillingDetailsToCustomer'
import { getCustomerByStripeCustomerId } from './getCustomerByStripeCustomerId'
import { stripe } from './stripe'
import { updateSubscription } from './updateSubscription'

export const manageSubscriptionStatusChange = async ({
  subscriptionId,
  customerId,
  createAction,
}: {
  subscriptionId: string
  customerId: string
  createAction: boolean
}) => {
  // Get customer's UUID from mapping table.
  const customer = await getCustomerByStripeCustomerId(customerId)

  // if no customer was returned and we are updating or deleting a subscription, throw an error
  if (!customer) {
    throw new Error(`No customer found for Stripe customer ID [${customerId}]`)
  }

  const uid = customer.id

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  })

  await updateSubscription(uid, subscription)

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (
    createAction &&
    subscription.default_payment_method &&
    typeof subscription.default_payment_method !== 'string' &&
    uid
  ) {
    await copyBillingDetailsToCustomer(uid, subscription.default_payment_method)
  }
}
