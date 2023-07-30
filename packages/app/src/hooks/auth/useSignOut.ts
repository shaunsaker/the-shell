import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signOut } from '../../auth/signOut'

export const useSignOut = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // invalidate all queries
      queryClient.clear()
    },
  })
}
