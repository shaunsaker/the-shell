import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { onAuthStateChange } from '../../services/supabase/onAuthStateChanged'
import { SESSION_QUERY_KEY } from './useSession'

export const useOnAuthStateChange = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const subscription = onAuthStateChange(() => {
      // invalidate the query session cache so that we refetch the session
      queryClient.invalidateQueries([SESSION_QUERY_KEY])
    })

    return () => subscription.unsubscribe()
  }, [queryClient])
}
