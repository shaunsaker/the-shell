import { TeamMemberRole } from '../models'

export const parseTeamMemberRole = (role: string): TeamMemberRole => {
  switch (role) {
    case 'Admin':
      return 'admin'
    default:
      return 'member'
  }
}
