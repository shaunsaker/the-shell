import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { QueryKeys } from '../../types'
import { listenSubscriptionInfo } from '../api/listenSubscriptionInfo'
import { useSubscriptionSeats } from './useSubscriptionSeats'

export const useSubscriptionInfoListener = () => {
  const { data: subscriptionSeats } = useSubscriptionSeats()
  const queryClient = useQueryClient()

  // NOTE: this assumes we only have one subscription per user
  const subscriptionId = subscriptionSeats?.length && subscriptionSeats[0].subscriptionId

  useEffect(() => {
    if (subscriptionId) {
      // subscribe to the subscription info changes
      const unsubscribe = listenSubscriptionInfo(subscriptionId, subscriptionInfo => {
        queryClient.setQueryData([QueryKeys.SubscriptionInfo], subscriptionInfo)
      })

      return unsubscribe
    }
  }, [queryClient, subscriptionId])
}
