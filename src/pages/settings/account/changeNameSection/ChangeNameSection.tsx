import { Button, Text, TextInput } from '@tremor/react'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { supabase } from '../../../../services/supabase'
import { useSession } from '../../../../store/user/useSession'

export const ChangeNameSection = (): ReactElement => {
  const { session } = useSession()
  const firstName = session?.user?.user_metadata?.first_name || ''
  const lastName = session?.user?.user_metadata?.last_name || ''
  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const [loading, setLoading] = useState(false)

  const disabled = !newFirstName || !newLastName || (firstName === newFirstName && lastName === newLastName)

  useEffect(() => {
    // if the session names update, update newFirstName and newLastName
    setNewFirstName(firstName)
    setNewLastName(lastName)
  }, [firstName, lastName])

  const onSave = useCallback(async () => {
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: newFirstName,
        last_name: newLastName,
      },
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Name updated successfully!')
    }

    setLoading(false)
  }, [newFirstName, newLastName])

  return (
    <SettingsSection title="Change name" description="Update your personal details associated with your account.">
      <div className="flex flex-wrap gap-6 lg:flex-nowrap">
        <div className="flex-1">
          <Text className="mb-2">First Name</Text>

          <TextInput
            className="mt-2"
            placeholder="Enter your first name..."
            value={newFirstName}
            onChange={event => setNewFirstName(event.target.value)}
          />
        </div>

        <div className="flex-1">
          <Text className="mb-2">Last Name</Text>

          <TextInput
            className="mt-2"
            placeholder="Enter your last name..."
            value={newLastName}
            onChange={event => setNewLastName(event.target.value)}
          />
        </div>
      </div>

      <div>
        <Button disabled={disabled} loading={loading} onClick={onSave}>
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
