import { firebase } from '../firebaseAdmin'

export const deleteSubscriptionInfo = async (subscriptionInfo: string) => {
  await firebase.firestore().collection('subscriptionInfo').doc(subscriptionInfo).delete()
}
