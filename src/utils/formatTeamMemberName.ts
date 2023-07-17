import { TeamMember } from '../models'

export const formatTeamMemberName = (teamMember?: TeamMember) => {
  if (!teamMember || !teamMember.user.first_name || !teamMember.user.last_name) {
    return ''
  }

  return `${teamMember.user.first_name} ${teamMember.user.last_name}`
}
