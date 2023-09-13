import React, { ReactElement } from 'react'

import { SettingsList } from '../../../components/settingsList/SettingsList'
import { ChangeEmailSection } from './components/changeEmailSection/ChangeEmailSection'
import { ChangeNameSection } from './components/changeNameSection/ChangeNameSection'
import { ChangePasswordSection } from './components/changePasswordSection/ChangePasswordSection'
import { DeleteAccountSection } from './components/deleteAccountSection/DeleteAccountSection'

export const SettingsAccount = (): ReactElement => {
  return (
    <SettingsList>
      <ChangeNameSection />

      <ChangeEmailSection />

      <ChangePasswordSection />

      <DeleteAccountSection />
    </SettingsList>
  )
}
