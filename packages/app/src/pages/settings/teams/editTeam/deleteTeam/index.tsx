import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog } from '../../../../../components/dialog/Dialog'
import { useDeleteTeam } from '../../../../../teams/hooks/useDeleteTeam'
import { useRestrictedTeamAdminRoute } from '../../../../../teams/hooks/useRestrictedTeamAdminRoute'
import { useTeam } from '../../../../../teams/hooks/useTeam'

export const SettingsDeleteTeam = (): ReactElement => {
  const { data: team } = useTeam()
  const { mutate: deleteTeam, isLoading: deleteTeamLoading } = useDeleteTeam()
  const navigate = useNavigate()
  useRestrictedTeamAdminRoute()

  const disabled = !team || deleteTeamLoading

  return (
    <Dialog
      open
      title="Delete team"
      description={`Are you sure you want to delete the ${team?.name} team? This action cannot be undone.`}
      confirmText="Delete"
      confirmDisabled={disabled}
      confirmLoading={deleteTeamLoading}
      confirmIsDangerous
      onConfirmClick={() => {
        if (team) {
          deleteTeam({
            teamId: team.id,
          })
        }
      }}
      onClose={() => {
        navigate(-1)
      }}
    />
  )
}
