import React, { ReactNode } from 'react'

import { SettingsList } from '../../../../../../components/settingsList/SettingsList'
import { SettingsTeamsNavbar } from '../../../../../../components/settingsTeamsNavbar/SettingsTeamsNavbar'
import { useRestrictedTeamAdminRoute } from '../../../../../../hooks/teams/useRestrictedTeamAdminRoute'
import { useTeamMember } from '../../../../../../hooks/teams/useTeamMember'
import { ChangeTeamMemberRoleSection } from './components/changeTeamMemberRoleSection/ChangeTeamMemberRoleSection'
import { RemoveTeamMemberSection } from './components/removeTeamMemberSection/RemoveTeamMemberSection'
import { ResendTeamInviteSection } from './components/resendTeamInviteSection/ResendTeamInviteSection'

type SettingsTeamsProps = {
  children: ReactNode
}

export default function SettingsEditTeamMember({ children }: SettingsTeamsProps) {
  useRestrictedTeamAdminRoute()
  const { data: teamMember } = useTeamMember()

  const teamMemberIsInactive = teamMember?.status !== 'active'

  return (
    <SettingsList>
      <SettingsTeamsNavbar />

      {teamMemberIsInactive && <ResendTeamInviteSection />}

      <ChangeTeamMemberRoleSection />

      <RemoveTeamMemberSection />

      {children}
    </SettingsList>
  )
}
