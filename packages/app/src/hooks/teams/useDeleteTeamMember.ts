import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteTeamMember } from '../../api/teams/deleteTeamMember'
import { QueryKeys } from '../../models'
import { routes, TEAM_ID_PARAM } from '../../routes'

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient()
  const { teamId = '' } = useParams()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team member removed successfully')

      navigate(routes.settingsEditTeam.replace(TEAM_ID_PARAM, teamId))
    },
  })
}
