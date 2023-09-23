import { doc, getDoc } from 'firebase/firestore'
import { Firestore, SubscriptionInfo } from 'types'

import { db } from '../../firebase'

export const getSubscriptionInfo = async (subscriptionId: string) => {
  const ref = doc(db, Firestore.SubscriptionInfo, subscriptionId)
  const snapshot = await getDoc(ref)

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as SubscriptionInfo | undefined
}
