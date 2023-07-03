import { useMutation } from '@tanstack/react-query'

import { signInWithPassword } from '../../api/auth/signInWithPassword'

export const useSignInWithPassword = () => {
  return useMutation({
    mutationFn: signInWithPassword,
  })
}
