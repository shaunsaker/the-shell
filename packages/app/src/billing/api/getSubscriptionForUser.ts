import { collection, getDocs, query, where } from 'firebase/firestore'
import { Subscription } from 'types'

import { db } from '../../firebase'

// fetch the users subscription if they have one that is active or trialing
export const getSubscriptionForUser = async (uid: string) => {
  const ref = collection(db, 'subscriptions')
  const queryRef = query(ref, where('userId', '==', uid))

  const subscriptions = await getDocs(queryRef)

  // currently we only support single subscriptions
  return (subscriptions.docs[0]?.data() as Subscription) || null
}
