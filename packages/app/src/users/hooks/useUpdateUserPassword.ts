import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateUserPassword } from '../../auth/api/updateUserPassword'

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success('Your password has been updated successfully.')
    },
  })
}
