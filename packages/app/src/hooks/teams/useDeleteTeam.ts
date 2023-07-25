import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { deleteTeam } from '../../api/teams/deleteTeam'
import { QueryKeys } from '../../models'
import { routes } from '../../routes'

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team deleted successfully')

      router.push(routes.settingsTeams)
    },
  })
}
