import { Button, Navbar } from 'components'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSignOut } from '@/auth/hooks/useSignOut'
import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { useHasTeamPlan } from '@/billing/hooks/useHasTeamPlan'
import { features } from '@/features'
import { routes, TEAM_ID_PARAM } from '@/router/routes'
import { useTeams } from '@/teams/hooks/useTeams'

import { Header } from '../header/Header'

export const SettingsNavbar = () => {
  const location = useLocation()
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const { data: hasTeamPlan, isLoading: hasTeamPlanLoading } = useHasTeamPlan()
  const { data: teams, isLoading: teamsLoading } = useTeams() // multiple teams are unsupported on the FE and we don't know the default team id so we need to load all teams and choose a default

  const { mutate: signOut, isLoading: signOutLoading } = useSignOut()
  const navigate = useNavigate()

  const defaultTeamId = (teams?.length && teams[0].id) || ''
  const teamsPageDisabled =
    hasActiveSubscriptionLoading || !hasActiveSubscription || hasTeamPlanLoading || !hasTeamPlan || teamsLoading

  return (
    <Header>
      <Navbar>
        {features.auth && (
          <Navbar.Item
            active={location.pathname.includes(routes.settingsAccount)}
            onClick={() => {
              navigate(routes.settingsAccount)
            }}
          >
            Account
          </Navbar.Item>
        )}

        {features.subscriptions && (
          <Navbar.Item
            active={location.pathname.includes(routes.settingsSubscription)}
            onClick={() => {
              navigate(routes.settingsSubscription)
            }}
          >
            Subscription
          </Navbar.Item>
        )}

        {features.teams && (
          <Navbar.Item
            active={location.pathname.includes(routes.settingsTeam.replace(TEAM_ID_PARAM, defaultTeamId))}
            disabled={teamsPageDisabled}
            onClick={() => {
              routes.settingsTeam.replace(TEAM_ID_PARAM, defaultTeamId)
            }}
          >
            Team
          </Navbar.Item>
        )}

        {features.auth && (
          <div className="flex flex-1 justify-end">
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
          </div>
        )}
      </Navbar>
    </Header>
  )
}
