import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { onAuthStateChange } from '../../auth/api/onAuthStateChanged'
import { QueryKeys } from '../../models'

export const useAuthListener = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const unsubscribe = onAuthStateChange(authUser => {
      queryClient.setQueryData([QueryKeys.AuthUser], authUser)
    })

    return () => unsubscribe()
  }, [queryClient])
}
