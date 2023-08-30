import { doc, onSnapshot } from 'firebase/firestore'

import { db } from '../../firebase'
import { Subscription } from '../../types/firebase'

export const listenSubscriptionForUser = (uid: string, cb: (data: Subscription | undefined) => void) => {
  return onSnapshot(doc(db, 'subscriptions', uid), snapshot => {
    const subscription = snapshot.data() as Subscription | undefined

    cb(subscription)
  })
}
