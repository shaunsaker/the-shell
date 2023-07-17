import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { inviteTeamMembers } from '../../api/teams/inviteTeamMembers'
import { QueryKeys } from '../../models'
import { routes, TEAM_ID_PARAM } from '../../routes'

export const useInviteTeamMembers = () => {
  const queryClient = useQueryClient()
  const { teamId = '' } = useParams()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: inviteTeamMembers,
    onSuccess: () => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team members invited successfully')

      navigate(routes.settingsEditTeam.replace(TEAM_ID_PARAM, teamId))
    },
  })
}
