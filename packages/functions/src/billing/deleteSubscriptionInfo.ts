import { Firestore } from 'types'

import { firebase } from '../firebaseAdmin'

export const deleteSubscriptionInfo = async (subscriptionInfo: string) => {
  await firebase.firestore().collection(Firestore.SubscriptionInfo).doc(subscriptionInfo).delete()
}
