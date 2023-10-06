import { Firestore } from 'types'

import { firebase } from '@/firebase/admin'

export const deleteSubscriptionInfo = async (subscriptionInfo: string) => {
  await firebase.firestore().collection(Firestore.SubscriptionInfo).doc(subscriptionInfo).delete()
}
