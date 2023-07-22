import React, { ComponentProps, ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

import { useTeam } from '../../hooks/teams/useTeam'
import { useTeamMember } from '../../hooks/teams/useTeamMember'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../routes'
import { formatTeamMemberName } from '../../utils/formatTeamMemberName'
import { Breadcrumbs } from '../breadcrumbs/BreadCrumbs'

export const SettingsTeamsNavbar = (): ReactElement => {
  const { data: team } = useTeam()
  const { data: teamMember } = useTeamMember()
  const location = useLocation()

  const BREADCRUMBS: ComponentProps<typeof Breadcrumbs>['pages'] = []

  if (team) {
    const href = routes.settingsEditTeam.replace(TEAM_ID_PARAM, team.id.toString())

    BREADCRUMBS.push({
      name: team.name,
      href,
      isActive: (pathname: string) => href === pathname,
    })

    const hrefInviteTeamMembers = routes.settingsInviteTeamMembers.replace(TEAM_ID_PARAM, team.id.toString())

    if (location.pathname === hrefInviteTeamMembers) {
      BREADCRUMBS.push({
        name: 'Invite team members',
        href: hrefInviteTeamMembers,
        isActive: (pathname: string) => hrefInviteTeamMembers === pathname,
      })
    }

    const hrefAcceptInvite = routes.settingsAcceptInvite.replace(TEAM_ID_PARAM, team.id.toString())

    if (location.pathname === hrefAcceptInvite) {
      BREADCRUMBS.push({
        name: 'Accept invite',
        href: hrefAcceptInvite,
        isActive: (pathname: string) => hrefAcceptInvite === pathname,
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
        isActive: (pathname: string) => href === pathname,
      })
    }
  }

  return <Breadcrumbs pages={BREADCRUMBS} />
}
