import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsTeamsNavbar } from '../../../../components/settingsTeamsNavbar/SetttingsTeamsNavbar'
import { ChangeTeamNameSection } from './components/changeTeamNameSection/ChangeTeamNameSection'
import { DeleteTeamSection } from './components/deleteTeamSection/DeleteTeamSection'
import { ManageTeamMembersSection } from './components/manageTeamMembersSection/ManageTeamMembersSection'

export const SettingsEditTeam = (): ReactElement => {
  return (
    <SettingsList>
      <SettingsTeamsNavbar />

      <ManageTeamMembersSection />

      <ChangeTeamNameSection />

      <DeleteTeamSection />

      <Outlet />
    </SettingsList>
  )
}
