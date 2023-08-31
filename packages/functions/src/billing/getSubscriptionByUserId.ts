import { firebase } from '../firebaseAdmin'
import { Subscription } from '../models'

export const getSubscriptionByUserId = async (userId: string) => {
  const docs = await firebase.firestore().collection('subscriptions').where('userId', '==', userId).get()

  return docs.docs.map(doc => doc.data())[0] as Subscription
}
