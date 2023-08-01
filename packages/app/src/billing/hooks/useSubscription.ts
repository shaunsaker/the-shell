import { useQuery } from '@tanstack/react-query'

import { useSession } from '../../auth/hooks/useSession'
import { fetchSubscriptionForUser } from '../../billing/api/fetchSubscriptionForUser'
import { QueryKeys } from '../../models'

export const useSubscription = () => {
  const { data: session } = useSession()

  const userId = session?.user.id

  const query = useQuery({
    queryKey: [QueryKeys.Subscription],
    queryFn: () => (userId ? fetchSubscriptionForUser(userId) : undefined),
    enabled: Boolean(userId),
  })

  return {
    ...query,

    // for the loading state we use isFetching because the query may not be enabled yet if the user is not logged in
    isLoading: query.isFetching,
  }
}
