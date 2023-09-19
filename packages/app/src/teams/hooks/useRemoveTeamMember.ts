import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { routes, TEAM_ID_PARAM } from '../../router/routes'
import { removeTeamMember } from '../../teams/api/removeTeamMember'
import { getTeamMembersQueryKey, QueryKeys } from '../../types'

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: removeTeamMember,
    onSuccess: (_, { teamId, isLastTeamMember }) => {
      // invalidate the team members query to refetch the data
      const queriesToInvalidate: string[] = [getTeamMembersQueryKey(teamId)]

      // if the last team member was removed, the team is also deleted
      if (isLastTeamMember) {
        queriesToInvalidate.push(QueryKeys.Teams)
      }

      queryClient.invalidateQueries(queriesToInvalidate)

      toast.success(isLastTeamMember ? 'Team member and team removed successfully' : 'Team member removed successfully')

      navigate(
        // if the user is deleting the last team member then the team will also be deleted
        isLastTeamMember ? routes.settingsTeams : routes.settingsEditTeam.replace(TEAM_ID_PARAM, teamId),
      )
    },
  })
}
