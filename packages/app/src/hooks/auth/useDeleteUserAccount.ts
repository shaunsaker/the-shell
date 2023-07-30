import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { deleteUserAccount } from '../../auth/deleteUserAccount'
import { useSignOut } from './useSignOut'

export const useDeleteUserAccount = () => {
  const { mutate: signOut } = useSignOut()

  return useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: async () => {
      await signOut()

      toast.success('Your account has been deleted successfully.')
    },
  })
}
