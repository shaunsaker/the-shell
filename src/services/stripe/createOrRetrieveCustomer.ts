import Stripe from 'stripe'

import { supabase } from '../supabase'
import { stripe } from '.'

export const createOrRetrieveCustomer = async ({ email, uuid }: { email: string; uuid: string }) => {
  const { data, error } = await supabase.from('customers').select('stripe_customer_id').eq('id', uuid).single()

  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData: { metadata: { supabaseUUID: string }; email?: string } = {
      metadata: {
        supabaseUUID: uuid,
      },
    }

    if (email) customerData.email = email

    let customer: Stripe.Customer

    try {
      customer = await stripe.customers.create(customerData)
    } catch (error) {
      throw error
    }

    // Now insert the customer ID into our Supabase mapping table.
    const { error: supabaseError } = await supabase
      .from('customers')
      .insert([{ id: uuid, stripe_customer_id: customer.id }])

    // Key is not present in table \"users\
    // insert or update on table \"customers\" violates foreign key constraint \"customers_id_fkey\"
    if (supabaseError) throw supabaseError

    return customer.id
  }

  return data.stripe_customer_id
}
