import { useSession } from '../auth/useSession'
import { useTeam } from './useTeam'

export const useIsLoggedInUserTeamAdmin = () => {
  const { data: session } = useSession()
  const { data: team } = useTeam()

  if (!session || !team) {
    return false
  }

  const isLoggedInUserTeamAdmin = team.team_members?.some(
    teamMember => teamMember.user_id === session?.user.id && teamMember.role === 'admin'
  )

  return isLoggedInUserTeamAdmin
}
