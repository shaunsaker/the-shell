import { Firestore, Subscription } from 'types'

import { firebase } from '../firebaseAdmin'

export const getSubscription = async (id: string) => {
  const doc = await firebase.firestore().collection(Firestore.Subscriptions).doc(id).get()

  return {
    ...doc.data(),
    id,
  } as Subscription | undefined
}
