import { Firestore, Subscription } from 'types'

import { firebase } from '../firebaseAdmin'

export const getSubscriptionByOwnerId = async (ownerId: string) => {
  const docs = await firebase.firestore().collection(Firestore.Subscriptions).where('ownerId', '==', ownerId).get()

  return docs.docs.map(doc => doc.data())[0] as Subscription
}
