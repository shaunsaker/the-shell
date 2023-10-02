import React, { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../router/routes'
import { useTeam } from '../../teams/hooks/useTeam'
import { useTeamMember } from '../../teams/hooks/useTeamMember'
import { NavigationItem } from '../../types'
import { formatTeamMemberName } from '../../utils/formatTeamMemberName'
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs'

// TODO: SS handle loading states
export const SettingsTeamsBreadcrumbs = (): ReactElement => {
  const { data: team } = useTeam()
  const { data: teamMember } = useTeamMember()
  const location = useLocation()
  const navigate = useNavigate()

  const BREADCRUMBS: NavigationItem[] = []

  if (team) {
    const href = routes.settingsEditTeam.replace(TEAM_ID_PARAM, team.id.toString())

    BREADCRUMBS.push({
      name: team.name,
      href,
      active: href === location.pathname,
    })

    const hrefInviteTeamMembers = routes.settingsInviteTeamMembers.replace(TEAM_ID_PARAM, team.id.toString())

    if (location.pathname === hrefInviteTeamMembers) {
      BREADCRUMBS.push({
        name: 'Invite team members',
        href: hrefInviteTeamMembers,
        active: hrefInviteTeamMembers === location.pathname,
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
        active: href === location.pathname,
      })
    }
  }

  return (
    <Breadcrumbs
      items={BREADCRUMBS}
      onClick={(href: string) => {
        navigate(href)
      }}
    />
  )
}
