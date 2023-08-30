import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateUserPassword } from '../../auth/api/updateUserPassword'

export const useUpdateUserPassword = () => {
  return useMutation({
    // TODO: SS we need to use auth here and then update the user data
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success('Your password has been updated successfully.')
    },
  })
}
