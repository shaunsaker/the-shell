import React from 'react'

import { ChangeEmailSection } from './components/changeEmailSection/ChangeEmailSection'
import { ChangeNameSection } from './components/changeNameSection/ChangeNameSection'
import { ChangePasswordSection } from './components/changePasswordSection/ChangePasswordSection'
import { DeleteAccountSection } from './components/deleteAccountSection/DeleteAccountSection'

export const SettingsAccount = () => {
  return (
    <div>
      <ChangeNameSection />

      <ChangeEmailSection />

      <ChangePasswordSection />

      <DeleteAccountSection />
    </div>
  )
}
