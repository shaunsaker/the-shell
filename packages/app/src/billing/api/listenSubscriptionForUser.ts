import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Subscription } from 'types'

import { db } from '../../firebase'

export const listenSubscriptionForUser = (uid: string, cb: (data: Subscription | undefined) => void) => {
  const ref = collection(db, 'subscriptions')
  const queryRef = query(ref, where('userId', '==', uid))

  return onSnapshot(queryRef, querySnapshot => {
    // currently we only support single subscriptions
    const subscription = (querySnapshot.docs[0]?.data() as Subscription) || null

    cb(subscription)
  })
}
