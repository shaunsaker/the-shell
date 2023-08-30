import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { changeUserPassword } from '../api/changeUserPassword'

export const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: changeUserPassword,
    onSuccess: () => {
      toast.success('Your password has been changed successfully.')
    },
  })
}
