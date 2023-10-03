import { onDocumentUpdated } from 'firebase-functions/v2/firestore'
import { HttpsError } from 'firebase-functions/v2/https'
import { SubscriptionInfo } from 'types'

import { getSubscriptionInfo } from '../../billing/getSubscriptionInfo'
import { updateSubscriptionInfo } from '../../billing/updateSubscriptionInfo'

console.log('Hello from On Subscription Updated!')

export const onSubscriptionUpdated = onDocumentUpdated('subscriptions/{subscriptionId}', async event => {
  const subscriptionId = event.params?.subscriptionId
  const subscription = event.data?.after.data()

  if (!subscription) {
    throw new HttpsError('not-found', 'Subscription not found')
  }

  const subscriptionInfo = await getSubscriptionInfo(subscriptionId)

  if (!subscriptionInfo) {
    throw new HttpsError('not-found', 'Subscription info not found')
  }

  const id = subscription.id
  const priceId = subscription.priceId // the priceId may have changed
  const status = subscription.status // the status may have changed
  const totalSeats = subscription.quantity // the quantity may have changed
  const assignedSeats = subscriptionInfo.assignedSeats
  const availableSeats = totalSeats - assignedSeats // we need to update the available seats to reflect the new quantity (if it changed)

  const newSubscriptionInfo: SubscriptionInfo = {
    id,
    priceId,
    status,
    totalSeats,
    assignedSeats,
    availableSeats,
  }

  await updateSubscriptionInfo(newSubscriptionInfo)
})
