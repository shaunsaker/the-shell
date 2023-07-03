import { Button, Text, TextInput } from '@tremor/react'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'

import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { useSession } from '../../../../store/auth/useSession'
import { useUpdateUserData } from '../../../../store/auth/useUpdateUserData'

export const ChangeNameSection = (): ReactElement => {
  const { data: session } = useSession()
  const firstName = session?.user?.user_metadata?.first_name || ''
  const lastName = session?.user?.user_metadata?.last_name || ''
  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const { mutate: updateUserData, isLoading } = useUpdateUserData()

  // disable the save button if the name is the same as the current name or if the name is invalid
  const disabled = !newFirstName || !newLastName || (firstName === newFirstName && lastName === newLastName)

  useEffect(() => {
    // if the session names update, update newFirstName and newLastName
    setNewFirstName(firstName)
    setNewLastName(lastName)
  }, [firstName, lastName])

  const onSave = useCallback(async () => {
    await updateUserData({
      data: {
        first_name: newFirstName,
        last_name: newLastName,
      },
    })
  }, [newFirstName, newLastName, updateUserData])

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
        <Button disabled={disabled} loading={isLoading} onClick={onSave}>
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
