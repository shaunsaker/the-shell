import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../routes'
import { useIsLoggedInUserTeamAdmin } from './useIsLoggedInUserTeamAdmin'

export const useRestrictedTeamAdminRoute = () => {
  const navigate = useNavigate()

  const isLoggedInUserTeamAdmin = useIsLoggedInUserTeamAdmin()

  // only admins of the team should be able to access this page
  useEffect(() => {
    // TODO: SS test if loading state is an issue
    if (!isLoggedInUserTeamAdmin) {
      navigate(routes.settingsTeams)
    }
  }, [isLoggedInUserTeamAdmin, navigate])
}
