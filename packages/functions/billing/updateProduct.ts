import { supabaseAdmin } from '../supabaseAdmin'

export const updateProduct = async (product: {
  id: string
  active: boolean
  name: string
  description: string
  images: string[]
  metadata: {
    [key: string]: string
  }
}) => {
  const productData = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description,
    image: product.images[0] || null,
    metadata: product.metadata,
  }

  const { error } = await supabaseAdmin.from('products').upsert([productData])

  if (error) {
    throw error
  }

  console.log(`Product inserted/updated: ${product.id}`)
}
