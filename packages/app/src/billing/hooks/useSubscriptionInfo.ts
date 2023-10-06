import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/types'

import { getSubscriptionInfo } from '../api/getSubscriptionInfo'
import { useSubscriptionSeats } from './useSubscriptionSeats'

export const useSubscriptionInfo = () => {
  const { data: subscriptionSeats } = useSubscriptionSeats()

  // NOTE: this assumes we only have one subscription per user
  const subscriptionId = subscriptionSeats?.length && subscriptionSeats[0].subscriptionId

  const query = useQuery({
    queryKey: [QueryKeys.SubscriptionInfo],
    queryFn: () => (subscriptionId ? getSubscriptionInfo(subscriptionId) : undefined),
    enabled: Boolean(subscriptionId),
  })

  return {
    ...query,

    // for the loading state we use isFetching because the query may not be enabled yet if the user is not logged in
    isLoading: query.isFetching,
  }
}
