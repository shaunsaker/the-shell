import { supabaseAdmin } from './supabaseAdmin.ts'

export const upsertProductRecord = async (product: any) => {
  const productData = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description,
    image: product.images[0] || null,
    metadata: product.metadata,
  }

  const { error } = await supabaseAdmin.from('products').upsert([productData])
  if (error) throw error
  console.log(`Product inserted/updated: ${product.id}`)
}