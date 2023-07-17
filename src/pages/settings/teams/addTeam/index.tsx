import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog } from '../../../../components/dialog/Dialog'
import { TextInput } from '../../../../components/textInput/TextInput'
import { useCreateTeam } from '../../../../hooks/teams/useCreateTeam'
import { routes } from '../../../../routes'

export const SettingsAddTeam = (): ReactElement => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
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
        createTeam({ name })
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
