import { firebase } from '../firebaseAdmin'
import { Product } from '../models'
import { Stripe } from './stripe'

export const updateProduct = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    name: product.name,
    description: product.description || '',
    active: product.active,
    image: product.images[0] || '',
    metadata: product.metadata,
  }

  await firebase.firestore().collection('products').doc(product.id).set(productData)
}