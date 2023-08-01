import React, { ReactElement } from 'react'

import { Alert } from '../../../../../components/alert/Alert'
import { ChangePasswordSection } from '../../../../../components/changePasswordSection/ChangePasswordSection'
import { SettingsList } from '../../../../../components/settingsList/SettingsList'
import { SettingsTeamsBreadcrumbs } from '../../../../../components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'
import { ChangeNameSection } from '../../../account/components/changeNameSection/ChangeNameSection'

export const SettingsAcceptInvite = (): ReactElement => {
  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <Alert kind="success">Invite accepted.</Alert>

      <ChangeNameSection title="Add name" description="Add your personal details associated with your account." />

      <ChangePasswordSection
        title="Create password"
        description="Set your password so that you can access your account."
      />
    </SettingsList>
  )
}
