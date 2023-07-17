import { TeamMemberRole } from '../models'

export const formatTeamMemberRole = (role: TeamMemberRole): string => {
  switch (role) {
    case 'admin':
      return 'Admin'
    case 'member':
      return 'Member'
    default:
      return ''
  }
}
