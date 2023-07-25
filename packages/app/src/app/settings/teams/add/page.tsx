'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { Dialog } from '../../../../components/dialog/Dialog'
import { TextInput } from '../../../../components/textInput/TextInput'
import { useSession } from '../../../../hooks/auth/useSession'
import { useCreateTeam } from '../../../../hooks/teams/useCreateTeam'
import { routes } from '../../../../routes'

export default function SettingsAddTeam() {
  const router = useRouter()
  const [name, setName] = useState('')
  const { data: session } = useSession()
  const { mutate: createTeam, isLoading } = useCreateTeam()

  const disabled = !name || isLoading || !session

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
        router.replace(routes.settingsTeams)
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
