import { useQuery } from '@tanstack/react-query'

import { useAuthUser } from '../../auth/hooks/useAuthUser'
import { getSubscriptionForUser } from '../../billing/api/getSubscriptionForUser'
import { QueryKeys } from '../../types'

export const useSubscription = () => {
  const { data: user } = useAuthUser()

  const userId = user?.uid

  const query = useQuery({
    queryKey: [QueryKeys.Subscription],
    queryFn: () => (userId ? getSubscriptionForUser(userId) : undefined),
    enabled: Boolean(userId),
  })

  return {
    ...query,

    // for the loading state we use isFetching because the query may not be enabled yet if the user is not logged in
    isLoading: query.isFetching,
  }
}
