import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { listenSubscriptionForUser } from '../../billing/listenSubscriptionForUser'
import { QueryKeys } from '../../models'
import { useSession } from '../auth/useSession'

export const useSubscriptionListener = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const userId = session?.user.id

  useEffect(() => {
    if (userId) {
      // subscribe to supabase subscription changes
      const listener = listenSubscriptionForUser(userId, subscription => {
        queryClient.setQueryData([QueryKeys.Subscription], subscription)
      })

      return () => {
        listener.unsubscribe()
      }
    }
  }, [queryClient, userId])
}
