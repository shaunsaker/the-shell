import { SubscriptionInfo } from 'types'

import { firebase } from '../firebaseAdmin'

export const updateSubscriptionInfo = async (subscriptionInfo: SubscriptionInfo) => {
  await firebase
    .firestore()
    .collection('subscriptionInfo')
    .doc(subscriptionInfo.id)
    .set(subscriptionInfo, { merge: true })
}
