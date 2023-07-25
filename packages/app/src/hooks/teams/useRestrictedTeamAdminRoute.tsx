import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { routes } from '../../routes'
import { useSession } from '../auth/useSession'
import { useTeam } from './useTeam'

export const useRestrictedTeamAdminRoute = () => {
  const { data: team } = useTeam()
  const { data: session } = useSession()
  const router = useRouter()

  const isLoggedInUserTeamAdmin = team?.team_members.some(
    teamMember => teamMember.user_id === session?.user.id && teamMember.role === 'admin',
  )

  // only admins of the team should be able to access this page
  useEffect(() => {
    if (session && team && !isLoggedInUserTeamAdmin) {
      router.replace(routes.settingsTeams)
    }
  }, [isLoggedInUserTeamAdmin, router, session, team])
}
