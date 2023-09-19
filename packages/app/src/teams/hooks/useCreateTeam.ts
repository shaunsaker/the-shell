import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../router/routes'
import { QueryKeys } from '../../types'
import { createTeam } from '../api/createTeam'

export const useCreateTeam = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createTeam,
    onSuccess: data => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team created successfully')

      navigate(routes.settingsEditTeam.replace(':teamId', data.teamId))
    },
  })
}
