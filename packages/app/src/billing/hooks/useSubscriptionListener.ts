import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useAuthUser } from '../../auth/hooks/useAuthUser'
import { listenSubscriptionForUser } from '../../billing/api/listenSubscriptionForUser'
import { QueryKeys } from '../../types'

export const useSubscriptionListener = () => {
  const queryClient = useQueryClient()
  const { data: user } = useAuthUser()

  const userId = user?.uid

  useEffect(() => {
    if (userId) {
      // subscribe to the user's subscription changes
      const unsubscribe = listenSubscriptionForUser(userId, subscription => {
        queryClient.setQueryData([QueryKeys.Subscription], subscription)
      })

      return unsubscribe
    }
  }, [queryClient, userId])
}
