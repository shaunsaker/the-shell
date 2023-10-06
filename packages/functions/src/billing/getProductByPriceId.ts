import { Firestore, Price, Product } from 'types'

import { firebase } from '@/firebase/admin'

export const getProductByPriceId = async (priceId: string) => {
  const priceDoc = await firebase.firestore().collection(Firestore.Prices).doc(priceId).get()

  if (!priceDoc.exists) {
    throw new Error('Price not found')
  }

  const priceData = priceDoc.data() as Price

  if (!priceData) {
    throw new Error('Price not found')
  }

  const productDoc = await firebase.firestore().collection(Firestore.Products).doc(priceData.productId).get()

  if (!productDoc.exists) {
    throw new Error('Product not found')
  }

  const productData = productDoc.data() as Product

  if (!productData) {
    throw new Error('Product not found')
  }

  return productData
}
