import React, { ReactElement, useEffect, useState } from 'react'

import { useSendChangeEmailVerification } from '../../../../../auth/hooks/useSendChangeEmailVerification'
import { Button } from '../../../../../components/button/Button'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { TextInput } from '../../../../../components/textInput/TextInput'
import { useUser } from '../../../../../users/hooks/useUser'
import { validateEmail } from '../../../../../utils/validateEmail'

export const ChangeEmailSection = (): ReactElement => {
  const { data: user } = useUser()
  const email = user?.email || ''
  const [newEmail, setNewEmail] = useState(email)
  const { mutate: sendChangeEmailVerification, isLoading } = useSendChangeEmailVerification()

  // disable the save button if the email is the same as the current email or if the email is invalid
  const disabled = email === newEmail || !validateEmail(newEmail)

  useEffect(() => {
    // if the authUser email updates, update newEmail
    setNewEmail(email)
  }, [email])

  return (
    <SettingsSection title="Change email" description="Update your email address associated with your account.">
      <TextInput
        label="New email address"
        type="email"
        placeholder="Enter your email..."
        autoComplete="email"
        value={newEmail}
        onChange={event => setNewEmail(event.target.value)}
      />

      <div>
        <Button
          disabled={disabled}
          loading={isLoading}
          onClick={() => {
            sendChangeEmailVerification({ newEmail, oldEmail: email })
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
