import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSession } from '../../../../auth/hooks/useSession'
import { Dialog } from '../../../../components/dialog/Dialog'
import { TextInput } from '../../../../components/textInput/TextInput'
import { routes } from '../../../../routes'
import { useCreateTeam } from '../../../../teams/hooks/useCreateTeam'

export const SettingsAddTeam = (): ReactElement => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const { data: session } = useSession()
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
        if (session?.user.id) {
          createTeam({ name, userId: session.user.id })
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
