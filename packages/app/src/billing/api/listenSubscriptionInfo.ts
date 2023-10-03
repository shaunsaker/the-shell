import { doc, onSnapshot } from 'firebase/firestore'
import { Firestore, SubscriptionInfo } from 'types'

import { db } from '../../firebase'

export const listenSubscriptionInfo = (subscriptionId: string, cb: (data: SubscriptionInfo | undefined) => void) => {
  const ref = doc(db, Firestore.SubscriptionInfo, subscriptionId)

  return onSnapshot(ref, snapshot => {
    const subscriptionInfo = {
      id: snapshot.id,
      ...snapshot.data(),
    } as SubscriptionInfo | undefined

    cb(subscriptionInfo)
  })
}
