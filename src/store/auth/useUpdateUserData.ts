import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateUser } from '../../services/supabase/updateUser'

export const useUpdateUserData = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('Your details have been updated successfully.')
    },
  })
}
