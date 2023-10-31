import React from 'react'
import { Outlet } from 'react-router-dom'

import { SettingsList } from '@/components/settingsList/SettingsList'
import { SettingsTeamsBreadcrumbs } from '@/components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'

import { ChangeTeamNameSection } from './components/changeTeamNameSection/ChangeTeamNameSection'
import { ManageTeamMembersSection } from './components/manageTeamMembersSection/ManageTeamMembersSection'

export const SettingsTeam = () => {
  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <ManageTeamMembersSection />

      <ChangeTeamNameSection />

      <Outlet />
    </SettingsList>
  )
}
