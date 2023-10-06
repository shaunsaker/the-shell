import { Firestore, SubscriptionInfo } from 'types'

import { firebase } from '@/firebase/admin'

export const getSubscriptionInfo = async (subscriptionId: string) => {
  const doc = await firebase.firestore().collection(Firestore.SubscriptionInfo).doc(subscriptionId).get()

  return {
    ...doc.data(),
    id: subscriptionId,
  } as SubscriptionInfo | undefined
}
