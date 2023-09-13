import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '../../firebase'
import { Subscription } from '../../types/firebase'

// fetch the users subscription if they have one that is active or trialing
export const getSubscriptionForUser = async (uid: string) => {
  const subscriptions = await getDocs(query(collection(db, 'subscriptions'), where('userId', '==', uid)))

  // currently we only support single subscriptions
  return (subscriptions.docs[0]?.data() as Subscription) || null
}
