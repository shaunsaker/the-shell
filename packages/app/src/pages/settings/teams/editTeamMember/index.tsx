import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsTeamsBreadcrumbs } from '../../../../components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'
import { useRestrictedTeamAdminRoute } from '../../../../teams/hooks/useRestrictedTeamAdminRoute'
import { ChangeTeamMemberRoleSection } from './components/changeTeamMemberRoleSection/ChangeTeamMemberRoleSection'
import { RemoveTeamMemberSection } from './components/removeTeamMemberSection/RemoveTeamMemberSection'

export const SettingsEditTeamMember = (): ReactElement => {
  useRestrictedTeamAdminRoute()

  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <ChangeTeamMemberRoleSection />

      <RemoveTeamMemberSection />

      <Outlet />
    </SettingsList>
  )
}
