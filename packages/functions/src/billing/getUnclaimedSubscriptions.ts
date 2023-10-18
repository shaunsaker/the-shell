import { Firestore, Subscription } from 'types'

import { firebase } from '@/firebase/admin'

export const getUnclaimedSubscriptions = async (email: string) => {
  const docs = await firebase
    .firestore()
    .collection(Firestore.Subscriptions)
    .where('ownerId', '==', null)
    .where('email', '==', email)
    .get()

  return docs.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Subscription[]
}
