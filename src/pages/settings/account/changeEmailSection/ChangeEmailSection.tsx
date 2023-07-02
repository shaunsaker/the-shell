import { Button, Text, TextInput } from '@tremor/react'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { supabase } from '../../../../services/supabase'
import { useSession } from '../../../../store/user/useSession'
import { validateEmail } from '../../../../utils/validateEmail'

export const ChangeEmailSection = (): ReactElement => {
  const { data: session } = useSession()
  const email = session?.session?.user.email || ''
  const [newEmail, setNewEmail] = useState(email)
  const [loading, setLoading] = useState(false)

  const disabled = email === newEmail || !validateEmail(newEmail)

  useEffect(() => {
    // if the session email updates, update newEmail
    setNewEmail(email)
  }, [email])

  const onSave = useCallback(async () => {
    setLoading(true)

    const { error } = await supabase.auth.updateUser(
      {
        email: newEmail,
      },
      {
        emailRedirectTo: window.location.href,
      }
    )

    if (error) {
      toast.error(error.message)
    } else {
      // update the email in the store
      setNewEmail(newEmail)

      toast.success('A confirmation email has been sent to your new email address.')
    }

    setLoading(false)
  }, [newEmail, setNewEmail])

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
        <Button disabled={disabled} loading={loading} onClick={onSave}>
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
