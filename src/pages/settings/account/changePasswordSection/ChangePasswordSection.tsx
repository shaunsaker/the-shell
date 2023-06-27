import { Button, Text, TextInput } from '@tremor/react'
import React, { ReactElement, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { supabase } from '../../../../services/supabase'

export const ChangePasswordSection = (): ReactElement => {
  const [newUserPassword, setNewUserPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const disabled = !newUserPassword

  const onSave = useCallback(async () => {
    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password: newUserPassword })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Your password has been updated')
    }

    setLoading(false)
  }, [newUserPassword])

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
        <Button disabled={disabled} loading={loading} onClick={onSave}>
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
