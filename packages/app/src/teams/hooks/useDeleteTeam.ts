import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../router/routes'
import { deleteTeam } from '../../teams/api/deleteTeam'
import { QueryKeys } from '../../types'

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team deleted successfully')

      navigate(routes.settingsTeams)
    },
  })
}
