import { collection, onSnapshot, query, where } from 'firebase/firestore'

import { db } from '../../firebase'
import { Subscription } from '../../types/firebase'

export const listenSubscriptionForUser = (uid: string, cb: (data: Subscription | undefined) => void) => {
  const ref = query(collection(db, 'subscriptions'), where('userId', '==', uid))

  return onSnapshot(ref, querySnapshot => {
    // currently we only support single subscriptions
    const subscription = querySnapshot.docs[0].data() as Subscription | undefined

    cb(subscription)
  })
}
