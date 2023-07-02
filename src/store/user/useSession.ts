import { useQuery } from '@tanstack/react-query'

import { getSession } from '../../services/supabase/getSession'

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
  })
}
