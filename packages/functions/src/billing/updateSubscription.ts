import { Firestore, Subscription, SubscriptionStatus } from 'types'

import { firebase } from '../firebaseAdmin'
import { getISOString } from '../utils/getISOString'
import { Stripe } from './stripe'

const parseSubscriptionStatus = (status: string): SubscriptionStatus => {
  switch (status) {
    case 'trialing':
      return SubscriptionStatus.Trialing
    case 'active':
      return SubscriptionStatus.Active
    case 'cancelled':
      return SubscriptionStatus.Cancelled
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

export const updateSubscription = async (uid: string, stripeSubscription: Stripe.Subscription) => {
  const subscriptionData: Subscription = {
    id: stripeSubscription.id,
    ownerId: uid,
    priceId: stripeSubscription.items.data[0].price.id,
    quantity: stripeSubscription.items.data[0].quantity || 1,
    status: parseSubscriptionStatus(stripeSubscription.status),
    created: getISOString(stripeSubscription.created * 1000),
    trialStart: stripeSubscription.trial_start ? getISOString(stripeSubscription.trial_start * 1000) : '',
    trialEnd: stripeSubscription.trial_end ? getISOString(stripeSubscription.trial_end * 1000) : '',
    currentPeriodStart: getISOString(stripeSubscription.current_period_start * 1000),
    currentPeriodEnd: getISOString(stripeSubscription.current_period_end * 1000),
    cancelAt: stripeSubscription.cancel_at ? getISOString(stripeSubscription.cancel_at * 1000) : '',
    cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    canceledAt: stripeSubscription.canceled_at ? getISOString(stripeSubscription.canceled_at * 1000) : '',
    endedAt: stripeSubscription.ended_at ? getISOString(stripeSubscription.ended_at * 1000) : '',
    metadata: stripeSubscription.metadata,
  }

  await firebase.firestore().collection(Firestore.Subscriptions).doc(stripeSubscription.id).set(subscriptionData)
}
