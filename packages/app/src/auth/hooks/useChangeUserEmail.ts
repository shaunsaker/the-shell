import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { QueryKeys } from '../../models'
import { updateUser } from '../../users/api/updateUser'
import { changeUserEmail } from '../api/changeUserEmail'

export const useChangeUserEmail = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeUserEmail,
    onSuccess: async ({ uid, email }) => {
      // update the user data with the new email
      await updateUser({ id: uid, email })

      // invalidate the user data query so it will be refetched with the new email
      queryClient.invalidateQueries([QueryKeys.User])

      toast.success('Your email has been changed successfully.')
    },
  })
}
