import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateUser } from '../../auth/api/updateUser'

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('Your password has been updated successfully.')
    },
  })
}
