import { Firestore, Subscription } from 'types'

import { firebase } from '@/firebase/admin'

export const getSubscription = async (id: string) => {
  const doc = await firebase.firestore().collection(Firestore.Subscriptions).doc(id).get()

  return {
    ...doc.data(),
    id,
  } as Subscription | undefined
}
