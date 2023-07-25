import React from 'react'

import { ChangePasswordSection } from '../../../components/changePasswordSection/ChangePasswordSection'
import { SettingsList } from '../../../components/settingsList/SettingsList'
import { ChangeEmailSection } from './components/changeEmailSection/ChangeEmailSection'
import { ChangeNameSection } from './components/changeNameSection/ChangeNameSection'
import { DeleteAccountSection } from './components/deleteAccountSection/DeleteAccountSection'

export default function SettingsAccount() {
  return (
    <SettingsList>
      <ChangeNameSection />

      <ChangeEmailSection />

      <ChangePasswordSection />

      <DeleteAccountSection />
    </SettingsList>
  )
}
