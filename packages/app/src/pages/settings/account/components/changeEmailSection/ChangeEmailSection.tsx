import { Button } from '@tremor/react'
import React, { ReactElement, useEffect, useState } from 'react'

import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { TextInput } from '../../../../../components/textInput/TextInput'
import { useSession } from '../../../../../hooks/auth/useSession'
import { useUpdateUserEmail } from '../../../../../hooks/auth/useUpdateUserEmail'
import { validateEmail } from '../../../../../utils/validateEmail'

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

  return (
    <SettingsSection title="Change email" description="Update your email address associated with your account.">
      <TextInput
        label="Email address"
        placeholder="Enter your email..."
        autoComplete="email"
        value={newEmail}
        onChange={event => setNewEmail(event.target.value)}
        // @ts-expect-error FIXME: override tremor type
        type="email"
      />

      <div>
        <Button
          disabled={disabled}
          loading={isLoading}
          onClick={() => {
            updateUserEmail({ email: newEmail })
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
