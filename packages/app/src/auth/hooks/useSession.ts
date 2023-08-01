import { useQuery } from '@tanstack/react-query'

import { getSession } from '../../auth/api/getSession'
import { QueryKeys } from '../../models'

export const useSession = () => {
  return useQuery({
    queryKey: [QueryKeys.Session],
    queryFn: getSession,
  })
}
