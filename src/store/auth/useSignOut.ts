import { useMutation } from '@tanstack/react-query'

import { signOut } from '../../services/supabase/signOut'

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  })
}
