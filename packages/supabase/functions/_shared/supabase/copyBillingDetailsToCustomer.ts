import { stripe } from '../stripe/index.ts'
import { supabaseAdmin } from './supabaseAdmin.ts'

/**
 * Copies the billing details from the payment method to the customer object.
 */
export const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: {
    customer: string
    billing_details: {
      name: string
      phone: string
      address: {
        city: string
        country: string
        line1: string
        line2: string
        postal_code: string
        state: string
      }
    }
    type: string
    [key: string]: any
  },
) => {
  const customer = payment_method.customer as string
  const { name, phone, address } = payment_method.billing_details

  // @ts-expect-error FIXME: stripe types in Deno are currently broken
  await stripe.customers.update(customer, { name, phone, address })

  const { error } = await supabaseAdmin
    .from('users')
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] },
    })
    .eq('id', uuid)

  if (error) {
    throw error
  }
}
