import React from 'react'
import { Outlet } from 'react-router-dom'

import { useRestrictedSubscriptionRoute } from '@/billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '@/billing/hooks/useRestrictedTeamPlanRoute'
import { Loading } from '@/components/loading/Loading'
import { SettingsList } from '@/components/settingsList/SettingsList'
import { SettingsTeamsBreadcrumbs } from '@/components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'

import { ChangeTeamNameSection } from './components/changeTeamNameSection/ChangeTeamNameSection'
import { ManageTeamMembersSection } from './components/manageTeamMembersSection/ManageTeamMembersSection'

export const SettingsTeam = () => {
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useRestrictedSubscriptionRoute()
  const { data: hasTeamPlan, isLoading: hasTeamPlanLoading } = useRestrictedTeamPlanRoute()

  const isLoading = hasActiveSubscriptionLoading || hasTeamPlanLoading

  if (isLoading) {
    return <Loading />
  }

  if (!hasActiveSubscription || !hasTeamPlan) {
    return null
  }

  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <ManageTeamMembersSection />

      <ChangeTeamNameSection />

      <Outlet />
    </SettingsList>
  )
}
