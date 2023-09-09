import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { verifyEmail } from '../api/verifyEmail'

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success('Your email has been verified successfully.')
    },
  })
}
