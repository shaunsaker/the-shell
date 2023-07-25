'use client'
import React, { ReactNode } from 'react'

import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsTeamsNavbar } from '../../../../components/settingsTeamsNavbar/SettingsTeamsNavbar'
import { ChangeTeamNameSection } from './components/changeTeamNameSection/ChangeTeamNameSection'
import { DeleteTeamSection } from './components/deleteTeamSection/DeleteTeamSection'
import { ManageTeamMembersSection } from './components/manageTeamMembersSection/ManageTeamMembersSection'

type SettingsEditTeamProps = {
  children: ReactNode
}

export default function SettingsEditTeam({ children }: SettingsEditTeamProps) {
  return (
    <SettingsList>
      <SettingsTeamsNavbar />

      <ManageTeamMembersSection />

      <ChangeTeamNameSection />

      <DeleteTeamSection />

      {children}
    </SettingsList>
  )
}
