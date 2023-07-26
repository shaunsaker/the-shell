import { deletePriceRecord } from './deletePriceRecord'
import { supabaseAdmin } from './supabaseAdmin'

export const deleteProductRecord = async (id: string) => {
  // stripe does not send a price.deleted event when a product is deleted
  // so we need to manually delete the price associated with the product
  const price = await supabaseAdmin.from('prices').select().eq('product_id', id)

  if (price.data) {
    await deletePriceRecord(price.data[0].id)
  }

  const { error } = await supabaseAdmin.from('products').delete().eq('id', id)

  if (error) {
    throw error
  }

  console.log(`Product deleted: ${id}`)
}
