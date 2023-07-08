import { supabaseAdmin } from './supabaseAdmin.ts'

export const getProductByPriceId = async (priceId: string) => {
  const { data: priceData, error: priceError } = await supabaseAdmin.from('prices').select().eq('id', priceId).single()

  if (priceError) throw priceError

  const { data, error } = await supabaseAdmin.from('products').select().eq('id', priceData.product_id).single()

  if (error) throw error

  return data
}
