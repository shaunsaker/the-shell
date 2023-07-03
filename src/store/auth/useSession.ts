import { useQuery } from '@tanstack/react-query'

import { getSession } from '../../services/supabase/getSession'

export const SESSION_QUERY_KEY = 'session'

export const useSession = () => {
  return useQuery({
    queryKey: [SESSION_QUERY_KEY],
    queryFn: getSession,
  })
}
