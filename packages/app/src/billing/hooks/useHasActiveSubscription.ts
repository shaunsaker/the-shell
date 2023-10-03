import { SubscriptionStatus } from 'types'

import { useSubscriptionInfo } from './useSubscriptionInfo'

export const useHasActiveSubscription = () => {
  const { data: subscriptionInfo, ...query } = useSubscriptionInfo()

  const hasActiveSubscription =
    subscriptionInfo?.status === SubscriptionStatus.Active || subscriptionInfo?.status === SubscriptionStatus.Trialing

  return {
    ...query,
    data: hasActiveSubscription,
  }
}
