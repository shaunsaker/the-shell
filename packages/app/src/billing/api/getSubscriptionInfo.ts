import { doc, getDoc } from 'firebase/firestore'
import { SubscriptionInfo } from 'types'

import { db } from '../../firebase'

export const getSubscriptionInfo = async (subscriptionId: string) => {
  const ref = doc(db, 'subscriptionInfo', subscriptionId)
  const snapshot = await getDoc(ref)

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as SubscriptionInfo
}
