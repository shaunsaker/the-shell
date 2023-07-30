import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../models'
import { fetchUser } from '../../users/fetchUser'
import { useSession } from '../auth/useSession'

export const useUser = () => {
  const { data: session } = useSession()

  const userId = session?.user.id

  const query = useQuery({
    queryKey: [QueryKeys.User],
    queryFn: () => (userId ? fetchUser(userId) : undefined),
    enabled: Boolean(userId),
  })

  return {
    ...query,

    // for the loading state we use isFetching because the query may not be enabled yet if the user is not logged in
    isLoading: query.isFetching,
  }
}
