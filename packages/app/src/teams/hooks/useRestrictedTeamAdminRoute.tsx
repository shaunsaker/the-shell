import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes, TEAM_ID_PARAM } from '../../router/routes'
import { useIsLoggedInUserTeamAdmin } from './useIsLoggedInUserTeamAdmin'
import { useTeams } from './useTeams'

// TODO: SS test me
export const useRestrictedTeamAdminRoute = () => {
  const navigate = useNavigate()
  const { data: isLoggedInUserTeamAdmin, isLoading: isLoggedInUserTeamAdminLoading } = useIsLoggedInUserTeamAdmin()
  const { data: teams, isLoading: teamsLoading } = useTeams()

  const isLoading = isLoggedInUserTeamAdminLoading || teamsLoading
  const defaultTeamId = (teams?.length && teams[0].id) || ''

  // only admins of the team should be able to access this page
  useEffect(() => {
    if (!isLoading && !isLoggedInUserTeamAdmin) {
      navigate(routes.settingsEditTeam.replace(TEAM_ID_PARAM, defaultTeamId))
    }
  }, [defaultTeamId, isLoading, isLoggedInUserTeamAdmin, navigate])
}
