import React, { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '@/router/routes'
import { useTeam } from '@/teams/hooks/useTeam'
import { useTeamMember } from '@/teams/hooks/useTeamMember'
import { NavigationItem } from '@/types'
import { formatTeamMemberName } from '@/utils/formatTeamMemberName'

import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs'
import { SkeletonLoader } from '../skeletonLoader/SkeletonLoader'

export const SettingsTeamsBreadcrumbs = (): ReactElement => {
  const location = useLocation()
  const { data: team, isLoading: teamLoading } = useTeam()
  const { data: teamMember, isLoading: teamMemberLoading } = useTeamMember()

  const navigate = useNavigate()

  const isLoading = teamLoading || teamMemberLoading

  const BREADCRUMBS: NavigationItem[] = []

  if (team) {
    const href = routes.settingsTeam.replace(TEAM_ID_PARAM, team.id.toString())

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
      const href = routes.settingsTeamMember
        .replace(TEAM_ID_PARAM, team?.id.toString() || '')
        .replace(TEAM_MEMBER_ID_PARAM, teamMember.id.toString())

      BREADCRUMBS.push({
        name,
        href,
        active: href === location.pathname,
      })
    }
  }

  if (isLoading) {
    return <SkeletonLoader />
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
