import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsTeamsBreadcrumbs } from '../../../../components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'
import { useRestrictedTeamAdminRoute } from '../../../../teams/hooks/useRestrictedTeamAdminRoute'
import { useTeamMember } from '../../../../teams/hooks/useTeamMember'
import { ChangeTeamMemberRoleSection } from './components/changeTeamMemberRoleSection/ChangeTeamMemberRoleSection'
import { RemoveTeamMemberSection } from './components/removeTeamMemberSection/RemoveTeamMemberSection'
import { ResendTeamInviteSection } from './components/resendTeamInviteSection/ResendTeamInviteSection'

export const SettingsEditTeamMember = (): ReactElement => {
  useRestrictedTeamAdminRoute()
  const { data: teamMember } = useTeamMember()

  const teamMemberIsInactive = teamMember?.status !== 'active'

  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      {teamMemberIsInactive && <ResendTeamInviteSection />}

      <ChangeTeamMemberRoleSection />

      <RemoveTeamMemberSection />

      <Outlet />
    </SettingsList>
  )
}
