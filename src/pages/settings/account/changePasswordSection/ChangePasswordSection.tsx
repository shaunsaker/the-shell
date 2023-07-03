import { Button, Text, TextInput } from '@tremor/react'
import React, { ReactElement, useCallback, useState } from 'react'

import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { useUpdateUserPassword } from '../../../../store/auth/useUpdateUserPassword'

export const ChangePasswordSection = (): ReactElement => {
  const [newUserPassword, setNewUserPassword] = useState('')
  const { mutate: updateUserPassword, isLoading } = useUpdateUserPassword()

  const disabled = !newUserPassword

  const onSave = useCallback(async () => {
    await updateUserPassword({ password: newUserPassword })
  }, [newUserPassword, updateUserPassword])

  return (
    <SettingsSection title="Change password" description="Update your password associated with your account.">
      <div>
        <Text className="mb-2">Password</Text>

        <TextInput
          className="mt-2"
          type="password"
          placeholder="Enter your new password..."
          autoComplete="password"
          value={newUserPassword}
          onChange={event => setNewUserPassword(event.target.value)}
        />
      </div>

      <div>
        <Button disabled={disabled} loading={isLoading} onClick={onSave}>
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
