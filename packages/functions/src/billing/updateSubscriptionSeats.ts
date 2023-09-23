import { SubscriptionSeat } from 'types'

import { firebase } from '../firebaseAdmin'

export const updateSubscriptionSeats = async (subscriptionSeats: SubscriptionSeat[]) => {
  const batch = firebase.firestore().batch()
  const subscriptionsRef = firebase.firestore().collection('subscriptions')

  for (const seat of subscriptionSeats) {
    const seatRef = subscriptionsRef.doc(seat.subscriptionId).collection('seats').doc(seat.id)

    batch.set(seatRef, seat, { merge: true })
  }

  await batch.commit()
}
