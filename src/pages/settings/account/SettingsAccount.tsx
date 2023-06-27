import React, { ReactElement } from 'react'

import { ChangeEmailSection } from './changeEmailSection/ChangeEmailSection'
import { ChangeNameSection } from './changeNameSection/ChangeNameSection'
import { ChangePasswordSection } from './changePasswordSection/ChangePasswordSection'
import { DeleteAccountSection } from './deleteAccountSection/DeleteAccountSection'

export const SettingsAccount = (): ReactElement => {
  return (
    <main className="flex flex-col gap-y-8">
      <ChangeNameSection />

      <ChangeEmailSection />

      <ChangePasswordSection />

      <DeleteAccountSection />
    </main>
  )
}
