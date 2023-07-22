import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { resetPasswordForEmail } from '../../api/auth/resetPasswordForEmail'

export const useResetPasswordForEmail = () => {
  return useMutation({
    mutationFn: resetPasswordForEmail,
    onSuccess: () => {
      toast.success('Password reset email sent')
    },
  })
}
