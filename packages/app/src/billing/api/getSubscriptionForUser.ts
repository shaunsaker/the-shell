import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../firebase'
import { Subscription } from '../../types/firebase'

// fetch the users subscription if they have one that is active or trialing
export const getSubscriptionForUser = async (uid: string) => {
  const subscription = await getDoc(doc(db, 'subscriptions', uid))

  return subscription.data() as Subscription | undefined
}
