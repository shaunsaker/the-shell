import { Price } from 'types'

import { firebase } from '../firebaseAdmin'

export const getPricesByProductId = async (productId: string) => {
  const docs = await firebase.firestore().collection('prices').where('productId', '==', productId).get()

  return docs.docs.map(doc => doc.data()) as Price[]
}
