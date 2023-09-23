import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { useRestrictedSubscriptionRoute } from '../../../../billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '../../../../billing/hooks/useRestrictedTeamPlanRoute'
import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsTeamsBreadcrumbs } from '../../../../components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'
import { ChangeTeamNameSection } from './components/changeTeamNameSection/ChangeTeamNameSection'
import { ManageTeamMembersSection } from './components/manageTeamMembersSection/ManageTeamMembersSection'

export const SettingsEditTeam = (): ReactElement => {
  useRestrictedSubscriptionRoute()
  useRestrictedTeamPlanRoute()

  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <ManageTeamMembersSection />

      <ChangeTeamNameSection />

      <Outlet />
    </SettingsList>
  )
}
