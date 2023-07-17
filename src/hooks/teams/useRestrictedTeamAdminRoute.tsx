import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../routes'
import { useSession } from '../auth/useSession'
import { useTeam } from './useTeam'

export const useRestrictedTeamAdminRoute = () => {
  const { data: team } = useTeam()
  const { data: session } = useSession()
  const navigate = useNavigate()

  const isLoggedInUserTeamAdmin = team?.team_members.some(
    teamMember => teamMember.user_id === session?.user.id && teamMember.role === 'admin'
  )

  // only admins of the team should be able to access this page
  useEffect(() => {
    if (session && team && !isLoggedInUserTeamAdmin) {
      navigate(routes.settingsTeams)
    }
  }, [isLoggedInUserTeamAdmin, navigate, session, team])
}
