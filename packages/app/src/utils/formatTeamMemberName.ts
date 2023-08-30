import { TeamMember } from '../types/firebase'

export const formatTeamMemberName = (teamMember?: TeamMember) => {
  if (!teamMember) return 'Unnamed Team Member'

  return `${teamMember.firstName} ${teamMember.lastName}`
}
