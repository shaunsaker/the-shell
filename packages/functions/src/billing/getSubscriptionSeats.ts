import { SubscriptionSeat } from 'types'

import { firebase } from '../firebaseAdmin'

export const getSubscriptionSeats = async (userId: string) => {
  const docs = await firebase.firestore().collectionGroup('seats').where('userId', '==', userId).get()

  return docs.docs.map(doc => doc.data()) as SubscriptionSeat[]
}
