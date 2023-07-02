import { useQuery } from '@tanstack/react-query'

import { fetchSubscriptionForUser } from '../../services/supabase/fetchSubscriptionForUser'
import { useSession } from '../user/useSession'

export const useSubscription = () => {
  const { data: session } = useSession()

  const uuid = session?.session?.user.id

  return useQuery({
    queryKey: ['subscription'],
    queryFn: () => (uuid ? fetchSubscriptionForUser(uuid) : undefined),
    enabled: Boolean(uuid),
  })
}
