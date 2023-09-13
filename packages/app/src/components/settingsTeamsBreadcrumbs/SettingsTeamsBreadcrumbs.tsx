import React, { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../routes'
import { useTeam } from '../../teams/hooks/useTeam'
import { useTeamMember } from '../../teams/hooks/useTeamMember'
import { formatTeamMemberName } from '../../utils/formatTeamMemberName'
import { Breadcrumbs, NavigationItem } from '../breadcrumbs/Breadcrumbs'

export const SettingsTeamsBreadcrumbs = (): ReactElement => {
  const { data: team } = useTeam()
  const { data: teamMember } = useTeamMember()
  const location = useLocation()

  const BREADCRUMBS: NavigationItem[] = []

  if (team) {
    const href = routes.settingsEditTeam.replace(TEAM_ID_PARAM, team.id.toString())

    BREADCRUMBS.push({
      name: team.name,
      href,
      isActive: href === location.pathname,
    })

    const hrefInviteTeamMembers = routes.settingsInviteTeamMembers.replace(TEAM_ID_PARAM, team.id.toString())

    if (location.pathname === hrefInviteTeamMembers) {
      BREADCRUMBS.push({
        name: 'Invite team members',
        href: hrefInviteTeamMembers,
        isActive: hrefInviteTeamMembers === location.pathname,
      })
    }
  }

  if (teamMember) {
    const name = formatTeamMemberName(teamMember) || teamMember.email

    if (name) {
      const href = routes.settingsEditTeamMember
        .replace(TEAM_ID_PARAM, team?.id.toString() || '')
        .replace(TEAM_MEMBER_ID_PARAM, teamMember.id.toString())

      BREADCRUMBS.push({
        name,
        href,
        isActive: href === location.pathname,
      })
    }
  }

  return <Breadcrumbs items={BREADCRUMBS} />
}
