import { Loading } from 'components'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useRestrictedSubscriptionRoute } from '@/billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '@/billing/hooks/useRestrictedTeamPlanRoute'
import { SettingsList } from '@/components/settingsList/SettingsList'
import { SettingsTeamsBreadcrumbs } from '@/components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'
import { useRestrictedTeamAdminRoute } from '@/teams/hooks/useRestrictedTeamAdminRoute'

import { ChangeTeamMemberRoleSection } from './components/changeTeamMemberRoleSection/ChangeTeamMemberRoleSection'
import { RemoveTeamMemberSection } from './components/removeTeamMemberSection/RemoveTeamMemberSection'

export const SettingsTeamMember = () => {
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useRestrictedSubscriptionRoute()
  const { data: hasTeamPlan, isLoading: hasTeamPlanLoading } = useRestrictedTeamPlanRoute()
  const { data: isTeamAdmin, isLoading: isTeamAdminLoading } = useRestrictedTeamAdminRoute()

  const isLoading = hasActiveSubscriptionLoading || hasTeamPlanLoading || isTeamAdminLoading

  if (isLoading) {
    return <Loading />
  }

  if (!hasActiveSubscription || !hasTeamPlan || !isTeamAdmin) {
    return null
  }

  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <ChangeTeamMemberRoleSection />

      <RemoveTeamMemberSection />

      <Outlet />
    </SettingsList>
  )
}
