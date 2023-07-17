import { Button } from '@tremor/react'
import React, { ReactElement, useEffect, useState } from 'react'

import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { TextInput } from '../../../../../components/textInput/TextInput'
import { useSession } from '../../../../../hooks/auth/useSession'
import { useUpdateUserData } from '../../../../../hooks/auth/useUpdateUserData'

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

  return (
    <SettingsSection title="Change name" description="Update your personal details associated with your account.">
      <div className="flex flex-wrap gap-6 lg:flex-nowrap">
        <TextInput
          className="flex-1"
          label="First name"
          placeholder="Enter your first name..."
          value={newFirstName}
          onChange={event => setNewFirstName(event.target.value)}
        />

        <TextInput
          className="flex-1"
          label="Last name"
          placeholder="Enter your last name..."
          value={newLastName}
          onChange={event => setNewLastName(event.target.value)}
        />
      </div>

      <div>
        <Button
          disabled={disabled}
          loading={isLoading}
          onClick={() => {
            updateUserData({
              data: {
                first_name: newFirstName,
                last_name: newLastName,
              },
            })
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
