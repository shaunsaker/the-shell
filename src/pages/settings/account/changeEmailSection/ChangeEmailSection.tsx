import { Button, Text, TextInput } from '@tremor/react'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'

import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { useSession } from '../../../../store/auth/useSession'
import { useUpdateUserEmail } from '../../../../store/auth/useUpdateUserEmail'
import { validateEmail } from '../../../../utils/validateEmail'

export const ChangeEmailSection = (): ReactElement => {
  const { data: session } = useSession()
  const email = session?.user.email || ''
  const [newEmail, setNewEmail] = useState(email)
  const { mutate: updateUserEmail, isLoading } = useUpdateUserEmail()

  // disable the save button if the email is the same as the current email or if the email is invalid
  const disabled = email === newEmail || !validateEmail(newEmail)

  useEffect(() => {
    // if the session email updates, update newEmail
    setNewEmail(email)
  }, [email])

  const onSave = useCallback(async () => {
    await updateUserEmail({ email: newEmail })
  }, [newEmail, updateUserEmail])

  return (
    <SettingsSection title="Change email" description="Update your email address associated with your account.">
      <div>
        <Text className="mb-2">Email address</Text>

        <TextInput
          className="mt-2"
          placeholder="Enter your email..."
          autoComplete="email"
          value={newEmail}
          onChange={event => setNewEmail(event.target.value)}
          // @ts-expect-error override tremor type
          type="email"
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
