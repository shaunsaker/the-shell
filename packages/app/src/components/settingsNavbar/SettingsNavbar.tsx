import React, { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSignOut } from '../../auth/hooks/useSignOut'
import { useHasActiveSubscription } from '../../billing/hooks/useHasActiveSubscription'
import { useHasTeamPlan } from '../../billing/hooks/useHasTeamPlan'
import { routes, TEAM_ID_PARAM } from '../../router/routes'
import { useTeams } from '../../teams/hooks/useTeams'
import { NavigationItem } from '../../types'
import { Button } from '../button/Button'
import { Headerbar } from '../headerbar/Headerbar'
import { Navbar } from '../navbar/Navbar'

export const SettingsNavbar = (): ReactElement => {
  const location = useLocation()
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const { data: hasTeamPlan, isLoading: hasTeamPlanLoading } = useHasTeamPlan()
  const { data: teams, isLoading: teamsLoading } = useTeams() // multiple teams are unsupported on the FE and we don't know the default team id so we need to load all teams and choose a default
  const { mutate: signOut, isLoading: signOutLoading } = useSignOut()
  const navigate = useNavigate()

  const defaultTeamId = (teams?.length && teams[0].id) || ''
  const subscriptionPageDisabled = hasActiveSubscriptionLoading || !hasActiveSubscription
  const teamsPageDisabled =
    hasActiveSubscriptionLoading ||
    !hasActiveSubscription ||
    hasTeamPlanLoading ||
    !hasTeamPlan ||
    teamsLoading ||
    !defaultTeamId

  const items: NavigationItem[] = [
    {
      name: 'Account',
      href: routes.settingsAccount,
      active: location.pathname.includes(routes.settingsAccount),
    },
    {
      name: 'Subscription',
      href: routes.settingsSubscription,
      active: location.pathname.includes(routes.settingsSubscription),
      disabled: subscriptionPageDisabled,
    },
    {
      name: 'Team',
      href: routes.settingsEditTeam.replace(TEAM_ID_PARAM, defaultTeamId),
      active: location.pathname.includes(routes.settingsEditTeam.replace(TEAM_ID_PARAM, defaultTeamId)),
      disabled: teamsPageDisabled,
    },
  ]

  return (
    <Headerbar>
      <Navbar
        items={items}
        onClick={href => {
          navigate(href)
        }}
      >
        <Button
          className="rounded-none"
          variant="light"
          loading={signOutLoading}
          onClick={() => {
            signOut()
          }}
        >
          Sign out
        </Button>
      </Navbar>
    </Headerbar>
  )
}
