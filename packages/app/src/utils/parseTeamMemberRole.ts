import { TeamMemberRole } from '../types/firebase'

export const parseTeamMemberRole = (role: string): TeamMemberRole => {
  switch (role) {
    case 'admin':
      return TeamMemberRole.Admin
    default:
      return TeamMemberRole.Member
  }
}
