import { useQuery } from '@tanstack/react-query'

import { fetchSubscriptionForUser } from '../../api/subscriptions/fetchSubscriptionForUser'
import { QueryKeys } from '../../models'
import { useSession } from '../auth/useSession'

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
