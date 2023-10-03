import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { onAuthStateChanged } from '../../auth/api/onAuthStateChanged'
import { QueryKeys } from '../../types'

export const useAuthListener = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    // subscribe to the user's auth changes
    const unsubscribe = onAuthStateChanged(authUser => {
      queryClient.setQueryData([QueryKeys.AuthUser], authUser)
    })

    return unsubscribe
  }, [queryClient])
}
