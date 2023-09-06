import { TeamMember } from '../types/firebase'

export const formatTeamMemberName = (teamMember?: TeamMember) => {
  if (!teamMember || (!teamMember.firstName && !teamMember.lastName)) {
    return ''
  }

  return `${teamMember.firstName} ${teamMember.lastName}`
}
