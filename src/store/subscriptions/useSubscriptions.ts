import { useQuery } from '@tanstack/react-query'

import { fetchSubscriptionForUser } from '../../services/supabase/fetchSubscriptionForUser'
import { useSession } from '../auth/useSession'

export const useSubscriptions = () => {
  const { data: session } = useSession()

  const userId = session?.user.id

  const query = useQuery({
    queryKey: ['subscription'],
    queryFn: () => (userId ? fetchSubscriptionForUser(userId) : undefined),
    enabled: Boolean(userId),
  })

  return {
    ...query,

    // for the loading state we use isFetching because the query may not be enabled yet if the user is not logged in
    isLoading: query.isFetching,
  }
}
