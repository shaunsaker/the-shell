import React, { ReactElement, useState } from 'react'

import { useChangeUserPassword } from '../../auth/hooks/useChangeUserPassword'
import { Button } from '../button/Button'
import { SettingsSection } from '../settingsSection/SettingsSection'
import { TextInput } from '../textInput/TextInput'

type Props = {
  title?: string
  description?: string
}

export const ChangePasswordSection = ({
  title = 'Change password',
  description = 'Update your password associated with your account.',
}: Props): ReactElement => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const { mutate: changeUserPassword, isLoading } = useChangeUserPassword()

  const disabled = !newPassword

  return (
    <SettingsSection title={title} description={description}>
      <TextInput
        label="Current password"
        type="password"
        placeholder="Enter your current password..."
        autoComplete="password"
        value={currentPassword}
        onChange={event => setCurrentPassword(event.target.value)}
      />

      <TextInput
        label="New password"
        type="password"
        placeholder="Enter your new password..."
        autoComplete="password"
        value={newPassword}
        onChange={event => setNewPassword(event.target.value)}
      />

      <div>
        <Button
          disabled={disabled}
          loading={isLoading}
          onClick={() => {
            changeUserPassword({ currentPassword, newPassword })
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
