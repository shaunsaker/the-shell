import { Stripe, stripe } from './stripe'
import { updateCustomer } from './updateCustomer'

export const createCustomer = async ({ email, uid }: { email: string; uid: string }): Promise<string> => {
  const customerData: Stripe.CustomerCreateParams = {
    metadata: {
      uid,
    },
    email,
  }

  // Create the customer in Stripe
  const customer = await stripe.customers.create(customerData)

  // Save the customer in the db
  await updateCustomer(uid, { stripeCustomerId: customer.id })

  return customer.id
}
