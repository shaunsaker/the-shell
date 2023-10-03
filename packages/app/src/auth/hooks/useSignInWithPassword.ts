import { useMutation } from '@tanstack/react-query'

import { signInWithPassword } from '../../auth/api/signInWithPassword'

export const useSignInWithPassword = () => {
  return useMutation({
    mutationFn: signInWithPassword,
  })
}
