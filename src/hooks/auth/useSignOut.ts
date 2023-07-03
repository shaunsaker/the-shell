import { useMutation } from '@tanstack/react-query'

import { signOut } from '../../api/auth/signOut'

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  })
}
