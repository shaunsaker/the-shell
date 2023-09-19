import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { useRestrictedSubscriptionRoute } from '../../../../billing/hooks/useRestrictedSubscriptionRoute'
import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsTeamsBreadcrumbs } from '../../../../components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'
import { ChangeTeamNameSection } from './components/changeTeamNameSection/ChangeTeamNameSection'
import { DeleteTeamSection } from './components/deleteTeamSection/DeleteTeamSection'
import { ManageTeamMembersSection } from './components/manageTeamMembersSection/ManageTeamMembersSection'

export const SettingsEditTeam = (): ReactElement => {
  useRestrictedSubscriptionRoute()

  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <ManageTeamMembersSection />

      <ChangeTeamNameSection />

      <DeleteTeamSection />

      <Outlet />
    </SettingsList>
  )
}
