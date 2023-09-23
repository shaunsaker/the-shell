import { useParams } from 'react-router'
import { TeamMemberRole } from 'types'

import { useTeam } from './useTeam'

export const useIsTeamMemberLastAdmin = () => {
  const { teamMemberId = '' } = useParams()
  const { data: team, ...query } = useTeam()
  const teamMember = team?.members.find(member => member.id === teamMemberId)
  const teamHasOneAdmin = team?.members.filter(member => member.role === TeamMemberRole.Admin).length === 1
  const isLastAdmin = teamMember?.role === TeamMemberRole.Admin && teamHasOneAdmin

  return { data: isLastAdmin, ...query }
}
