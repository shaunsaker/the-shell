import React, { ReactElement, useState } from 'react'

import { useUpdateUserPassword } from '../../auth/hooks/useUpdateUserPassword'
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
  const [newUserPassword, setNewUserPassword] = useState('')
  const { mutate: updateUserPassword, isLoading } = useUpdateUserPassword()

  const disabled = !newUserPassword

  return (
    <SettingsSection title={title} description={description}>
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
