import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { inviteTeamMembers } from '../../api/teams/inviteTeamMembers'
import { QueryKeys } from '../../models'
import { routes, TEAM_ID_PARAM } from '../../routes'
import { useTeamIdParam } from './useTeamIdParam'

export const useInviteTeamMembers = () => {
  const queryClient = useQueryClient()
  const teamId = useTeamIdParam()
  const router = useRouter()

  return useMutation({
    mutationFn: inviteTeamMembers,
    onSuccess: () => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team members invited successfully')

      router.push(routes.settingsEditTeam.replace(TEAM_ID_PARAM, teamId))
    },
  })
}
