import { SubscriptionStatus } from 'types'

import { useSubscriptionInfo } from './useSubscriptionInfo'

export const useHasActiveSubscription = () => {
  const { data: susbcriptionInfo, ...query } = useSubscriptionInfo()

  const hasActiveSubscription =
    susbcriptionInfo?.status === SubscriptionStatus.Active || susbcriptionInfo?.status === SubscriptionStatus.Trialing

  return {
    ...query,
    data: hasActiveSubscription,
  }
}
