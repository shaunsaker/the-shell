import React from 'react'

import { Alert } from '../../../../../components/alert/Alert'
import { ChangePasswordSection } from '../../../../../components/changePasswordSection/ChangePasswordSection'
import { SettingsList } from '../../../../../components/settingsList/SettingsList'
import { SettingsTeamsNavbar } from '../../../../../components/settingsTeamsNavbar/SettingsTeamsNavbar'
import { ChangeNameSection } from '../../../account/components/changeNameSection/ChangeNameSection'

export default function SettingsAcceptInvite() {
  return (
    <SettingsList>
      <SettingsTeamsNavbar />

      <Alert kind="success">Invite accepted.</Alert>

      <ChangeNameSection title="Add name" description="Add your personal details associated with your account." />

      <ChangePasswordSection
        title="Create password"
        description="Set your password so that you can access your account."
      />
    </SettingsList>
  )
}
