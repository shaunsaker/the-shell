import { useParams } from 'react-router-dom'

import { useTeamMembers } from './useTeamMembers'

export const useTeamMember = () => {
  const { teamId = '', teamMemberId = '' } = useParams()
  const teamMembersQuery = useTeamMembers(teamId)

  const teamMember = teamMembersQuery.data?.find(teamMember => teamMember.id === teamMemberId)

  return {
    ...teamMembersQuery,
    data: teamMember,
  }
}
