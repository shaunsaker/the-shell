import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { onAuthStateChange } from '../../api/auth/onAuthStateChanged'
import { QueryKeys } from '../../models'

export const useAuthListener = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const subscription = onAuthStateChange(() => {
      // invalidate the query session cache so that we refetch it
      queryClient.invalidateQueries([QueryKeys.Session])
    })

    return () => subscription.unsubscribe()
  }, [queryClient])
}
