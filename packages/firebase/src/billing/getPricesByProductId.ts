import { firebase } from '../firebaseAdmin'
import { Price } from '../models'

export const getPricesByProductId = async (productId: string) => {
  const docs = await firebase.firestore().collection('prices').where('productId', '==', productId).get()

  return docs.docs.map(doc => doc.data()) as Price[]
}
