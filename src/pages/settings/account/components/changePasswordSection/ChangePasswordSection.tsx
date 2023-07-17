import { Button } from '@tremor/react'
import React, { ReactElement, useState } from 'react'

import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { TextInput } from '../../../../../components/textInput/TextInput'
import { useUpdateUserPassword } from '../../../../../hooks/auth/useUpdateUserPassword'

export const ChangePasswordSection = (): ReactElement => {
  const [newUserPassword, setNewUserPassword] = useState('')
  const { mutate: updateUserPassword, isLoading } = useUpdateUserPassword()

  const disabled = !newUserPassword

  return (
    <SettingsSection title="Change password" description="Update your password associated with your account.">
      <TextInput
        label="Password"
        type="password"
        placeholder="Enter your new password..."
        autoComplete="password"
        value={newUserPassword}
        onChange={event => setNewUserPassword(event.target.value)}
      />

      <div>
        <Button
          disabled={disabled}
          loading={isLoading}
          onClick={() => {
            updateUserPassword({ password: newUserPassword })
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
