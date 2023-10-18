import { Firestore, Subscription } from 'types'

import { firebase } from '@/firebase/admin'

export const getSubscriptionByUid = async (uid: string) => {
  const docs = await firebase.firestore().collection(Firestore.Subscriptions).where('ownerId', '==', uid).get()

  return docs.docs.map(doc => doc.data())[0] as Subscription
}
