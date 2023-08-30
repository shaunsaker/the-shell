import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../models'
import { getTeamMembers } from '../api/getTeamMembers'

export const useTeamMembers = (teamId?: string) => {
  return useQuery({
    queryKey: [QueryKeys.TeamMembers, teamId],
    queryFn: () => getTeamMembers(teamId as string),
    enabled: Boolean(teamId),
  })
}
