import { useQuery } from '@tanstack/react-query'

import { getSession } from '../../api/auth/getSession'
import { QueryKeys } from '../../models'

export const useSession = () => {
  return useQuery({
    queryKey: [QueryKeys.Session],
    queryFn: getSession,
  })
}
