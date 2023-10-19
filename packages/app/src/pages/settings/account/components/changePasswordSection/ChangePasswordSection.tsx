import React from 'react'

import { ResetPassword } from '@/components/resetPassword/ResetPassword'
import { SettingsSection } from '@/components/settingsSection/SettingsSection'

export const ChangePasswordSection = () => {
  return (
    <SettingsSection title="Change password" description="Update your password associated with your account.">
      <ResetPassword emailDisabled />
    </SettingsSection>
  )
}
