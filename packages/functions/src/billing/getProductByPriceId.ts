import { firebase } from '../firebaseAdmin'
import { Product } from '../models'

export const getProductByPriceId = async (priceId: string) => {
  const priceDoc = await firebase.firestore().collection('prices').doc(priceId).get()

  if (!priceDoc.exists) {
    throw new Error('Price not found')
  }

  const priceData = priceDoc.data()

  if (!priceData) {
    throw new Error('Price not found')
  }

  const productDoc = await firebase.firestore().collection('products').doc(priceData.product_id).get()

  if (!productDoc.exists) {
    throw new Error('Product not found')
  }

  const productData = productDoc.data()

  if (!productData) {
    throw new Error('Product not found')
  }

  return productData as Product
}
