import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { deleteTeamMember } from '../../api/teams/deleteTeamMember'
import { QueryKeys } from '../../models'
import { routes, TEAM_ID_PARAM } from '../../routes'
import { useTeamIdParam } from './useTeamIdParam'

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient()
  const teamId = useTeamIdParam()
  const router = useRouter()

  return useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team member removed successfully')

      router.push(routes.settingsEditTeam.replace(TEAM_ID_PARAM, teamId))
    },
  })
}
