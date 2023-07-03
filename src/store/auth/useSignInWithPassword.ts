import { useMutation } from '@tanstack/react-query'

import { signInWithPassword } from '../../services/supabase/signInWithPassword'

export const useSignInWithPassword = () => {
  return useMutation({
    mutationFn: signInWithPassword,
  })
}
