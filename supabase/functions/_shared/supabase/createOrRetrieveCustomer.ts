import { stripe } from '../stripe/index.ts'
import { supabaseAdmin } from './supabaseAdmin.ts'

export const createOrRetrieveCustomer = async ({ email, uuid }: { email: string; uuid: string }) => {
  const { data, error } = await supabaseAdmin.from('customers').select('stripe_customer_id').eq('id', uuid).single()

  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData: { metadata: { supabaseUUID: string }; email?: string } = {
      metadata: {
        supabaseUUID: uuid,
      },
    }

    if (email) customerData.email = email

    let customer

    try {
      // @ts-expect-error FIXME: stripe types in Deno are currently broken
      customer = await stripe.customers.create(customerData)
    } catch (error) {
      throw error
    }

    // Now insert the customer ID into our Supabase mapping table.
    const { error: supabaseError } = await supabaseAdmin
      .from('customers')
      .insert([{ id: uuid, stripe_customer_id: customer.id }])

    // Key is not present in table \"users\
    // insert or update on table \"customers\" violates foreign key constraint \"customers_id_fkey\"
    if (supabaseError) throw supabaseError

    return customer.id
  }

  return data.stripe_customer_id
}
