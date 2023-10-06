import { Price } from 'types'

import { firebase } from '@/firebase/admin'

export const getPricesByProductId = async (productId: string) => {
  const docs = await firebase.firestore().collection('prices').where('productId', '==', productId).get()

  return docs.docs.map(doc => doc.data()) as Price[]
}
