import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthUser } from '../../../../auth/hooks/useAuthUser'
import { Dialog } from '../../../../components/dialog/Dialog'
import { TextInput } from '../../../../components/textInput/TextInput'
import { routes } from '../../../../routes'
import { useCreateTeam } from '../../../../teams/hooks/useCreateTeam'
import { useUser } from '../../../../users/hooks/useUser'

export const SettingsAddTeam = (): ReactElement => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const { data: authUser } = useAuthUser()
  const { data: user } = useUser()
  const { mutate: createTeam, isLoading } = useCreateTeam()

  const disabled = !name || isLoading

  return (
    <Dialog
      open
      title="Add team"
      description="Add a new team to your organisation."
      confirmText="Save"
      confirmDisabled={disabled}
      confirmLoading={isLoading}
      onConfirmClick={() => {
        if (authUser?.uid && user) {
          createTeam({
            name,
            uid: authUser.uid,
            userFirstName: user.firstName,
            userLastName: user.lastName,
            userEmail: user.email,
          })
        }
      }}
      onClose={() => {
        navigate(routes.settingsTeams)
      }}
    >
      <TextInput
        label="Team name"
        placeholder="Enter a team name..."
        value={name}
        onChange={event => {
          setName(event.target.value)
        }}
      />
    </Dialog>
  )
}
