import { collectionGroup, getDocs, query, where } from 'firebase/firestore'
import { SubscriptionSeat } from 'types'

import { db } from '../../firebase'

// fetch the users subscription seats
export const getSubscriptionSeatsForUser = async (uid: string) => {
  const ref = collectionGroup(db, 'seats')
  const queryRef = query(ref, where('userId', '==', uid))

  const subscriptionSeats = await getDocs(queryRef)

  return subscriptionSeats.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as SubscriptionSeat),
  )
}
