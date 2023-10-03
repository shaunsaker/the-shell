import { copyBillingDetailsToCustomer } from './copyBillingDetailsToCustomer'
import { getCustomerByStripeCustomerId } from './getCustomerByStripeCustomerId'
import { stripe } from './stripe'
import { updateSubscription } from './updateSubscription'

export const manageSubscriptionStatusChange = async ({
  subscriptionId,
  customerId,
  isNewSubscription,
}: {
  subscriptionId: string
  customerId: string
  isNewSubscription: boolean
}) => {
  const customer = await getCustomerByStripeCustomerId(customerId)

  if (!customer) {
    throw new Error(`No customer found for Stripe customer ID [${customerId}]`)
  }

  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  })

  // the customer id is the uid of the user
  const uid = customer.id

  await updateSubscription(uid, stripeSubscription)

  if (isNewSubscription) {
    // For a new subscription copy the billing details to the customer object.
    // NOTE: This is a costly operation and should happen at the very end.
    if (stripeSubscription.default_payment_method && typeof stripeSubscription.default_payment_method !== 'string') {
      await copyBillingDetailsToCustomer(uid, stripeSubscription.default_payment_method)
    }
  }
}
