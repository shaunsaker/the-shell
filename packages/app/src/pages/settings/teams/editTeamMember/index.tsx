import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsTeamsNavbar } from '../../../../components/settingsTeamsNavbar/SettingsTeamsNavbar'
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
      <SettingsTeamsNavbar />

      {teamMemberIsInactive && <ResendTeamInviteSection />}

      <ChangeTeamMemberRoleSection />

      <RemoveTeamMemberSection />

      <Outlet />
    </SettingsList>
  )
}
