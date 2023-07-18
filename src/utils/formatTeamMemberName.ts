import { TeamMember } from '../models'

export const formatTeamMemberName = (teamMember?: TeamMember) => {
  if (!teamMember || !teamMember.first_name || !teamMember.last_name) {
    return ''
  }

  return `${teamMember.first_name} ${teamMember.last_name}`
}
