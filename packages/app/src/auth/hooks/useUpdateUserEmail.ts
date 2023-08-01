import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateUser } from '../../auth/api/updateUser'

export const useUpdateUserEmail = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('A confirmation email has been sent to your new email address.')
    },
  })
}
