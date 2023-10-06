import { onDocumentDeleted } from 'firebase-functions/v2/firestore'

import { deleteSubscriptionInfo } from '@/billing/deleteSubscriptionInfo'

console.log('Hello from On Subscription Deleted!')

export const onSubscriptionDeleted = onDocumentDeleted('subscriptions/{subscriptionId}', async event => {
  const subscriptionId = event.params?.subscriptionId

  // delete the subscription info
  await deleteSubscriptionInfo(subscriptionId)
})
