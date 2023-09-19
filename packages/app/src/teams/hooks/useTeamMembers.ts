import { useQuery } from '@tanstack/react-query'

import { getTeamMembersQueryKey } from '../../types'
import { getTeamMembers } from '../api/getTeamMembers'

export const useTeamMembers = (teamId?: string) => {
  return useQuery({
    queryKey: [getTeamMembersQueryKey(teamId as string)],
    queryFn: () => getTeamMembers(teamId as string),
    enabled: Boolean(teamId),
  })
}
