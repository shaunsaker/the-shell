import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../router/routes'
import { useIsLoggedInUserTeamAdmin } from './useIsLoggedInUserTeamAdmin'

export const useRestrictedTeamAdminRoute = () => {
  const navigate = useNavigate()
  const { data: isLoggedInUserTeamAdmin, isLoading } = useIsLoggedInUserTeamAdmin()

  // only admins of the team should be able to access this page
  useEffect(() => {
    if (!isLoading && !isLoggedInUserTeamAdmin) {
      navigate(routes.settingsTeams)
    }
  }, [isLoading, isLoggedInUserTeamAdmin, navigate])
}
