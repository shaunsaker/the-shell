import React, { ReactElement, useEffect, useState } from 'react'

import { Button } from '@/components/button/Button'
import { SettingsSection } from '@/components/settingsSection/SettingsSection'
import { TextInput } from '@/components/textInput/TextInput'
import { useUpdateUser } from '@/user/hooks/useUpdateUser'
import { useUser } from '@/user/hooks/useUser'

export const ChangeNameSection = (): ReactElement => {
  const { data: user } = useUser()

  const firstName = user?.firstName || ''
  const [newFirstName, setNewFirstName] = useState(firstName)

  const lastName = user?.lastName || ''
  const [newLastName, setNewLastName] = useState(lastName)

  const { mutate: updateUser, isLoading } = useUpdateUser()

  // disable the save button if the name is the same as the current name or if the name is invalid
  const disabled = !newFirstName || !newLastName || (firstName === newFirstName && lastName === newLastName)

  useEffect(() => {
    // if the authUser names update, update newFirstName and newLastName
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
            if (!user?.id) {
              return
            }

            updateUser({
              id: user.id,
              firstName: newFirstName,
              lastName: newLastName,
            })
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
