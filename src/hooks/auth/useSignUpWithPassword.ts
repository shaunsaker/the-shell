import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { signUp } from '../../api/auth/signUp'

export const useSignUpWithPassword = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      if (!import.meta.env.DEV) {
        // in development, the local server will not send a confirmation email so we manually redirect to the dashboard
        toast.success('A confirmation email has been sent to your inbox.')
      }
    },
  })
}
