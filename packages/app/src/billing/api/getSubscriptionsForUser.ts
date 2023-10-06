import { collection, getDocs, query, where } from 'firebase/firestore'
import { Firestore, Subscription } from 'types'

import { db } from '@/firebase'

// fetch the subscriptions that the user owns
export const getSubscriptionsForUser = async (uid: string) => {
  const ref = collection(db, Firestore.Subscriptions)
  const queryRef = query(ref, where('ownerId', '==', uid))

  const snapshot = await getDocs(queryRef)

  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Subscription),
  )
}
