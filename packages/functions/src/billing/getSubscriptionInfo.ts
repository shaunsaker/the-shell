import { SubscriptionInfo } from 'types'

import { firebase } from '../firebaseAdmin'

export const getSubscriptionInfo = async (subscriptionId: string) => {
  const doc = await firebase.firestore().collection('subscriptionInfo').doc(subscriptionId).get()

  return {
    ...doc.data(),
    id: subscriptionId,
  } as SubscriptionInfo | undefined
}
