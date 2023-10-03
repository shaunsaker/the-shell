import { SubscriptionSeat } from 'types'

import { firebase } from '../firebaseAdmin'

export const deleteSubscriptionSeats = async (subscriptionSeats: SubscriptionSeat[]) => {
  const batch = firebase.firestore().batch()

  subscriptionSeats.forEach(subscriptionSeat => {
    const ref = firebase
      .firestore()
      .collection('subscriptions')
      .doc(subscriptionSeat.subscriptionId)
      .collection('seats')
      .doc(subscriptionSeat.id)

    batch.delete(ref)
  })

  await batch.commit()
}
