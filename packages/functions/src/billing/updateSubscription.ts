import { Subscription, SubscriptionStatus } from 'types'

import { firebase } from '../firebaseAdmin'
import { getISOString } from '../utils/getISOString'
import { Stripe } from './stripe'

const parseSubscriptionStatus = (status: string): SubscriptionStatus => {
  switch (status) {
    case 'trialing':
      return SubscriptionStatus.Trialing
    case 'active':
      return SubscriptionStatus.Active
    case 'canceled':
      return SubscriptionStatus.Canceled
    case 'incomplete':
      return SubscriptionStatus.Incomplete
    case 'incomplete_expired':
      return SubscriptionStatus.IncompleteExpired
    case 'past_due':
      return SubscriptionStatus.PastDue
    case 'unpaid':
      return SubscriptionStatus.Unpaid
    case 'paused':
      return SubscriptionStatus.Paused
    default:
      return SubscriptionStatus.Incomplete
  }
}

export const updateSubscription = async (uid: string, subscription: Stripe.Subscription) => {
  const subscriptionData: Subscription = {
    id: subscription.id,
    userId: uid,
    priceId: subscription.items.data[0].price.id,
    quantity: subscription.items.data[0].quantity || 1,
    status: parseSubscriptionStatus(subscription.status),
    created: getISOString(subscription.created * 1000),
    trialStart: subscription.trial_start ? getISOString(subscription.trial_start * 1000) : '',
    trialEnd: subscription.trial_end ? getISOString(subscription.trial_end * 1000) : '',
    currentPeriodStart: getISOString(subscription.current_period_start * 1000),
    currentPeriodEnd: getISOString(subscription.current_period_end * 1000),
    cancelAt: subscription.cancel_at ? getISOString(subscription.cancel_at * 1000) : '',
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    canceledAt: subscription.canceled_at ? getISOString(subscription.canceled_at * 1000) : '',
    endedAt: subscription.ended_at ? getISOString(subscription.ended_at * 1000) : '',
    metadata: subscription.metadata,
  }

  await firebase.firestore().collection('subscriptions').doc(subscription.id).set(subscriptionData)
}
