import { useRouter } from 'next/navigation'
import React from 'react'

import { Dialog } from '../../../../../components/dialog/Dialog'
import { useDeleteTeam } from '../../../../../hooks/teams/useDeleteTeam'
import { useRestrictedTeamAdminRoute } from '../../../../../hooks/teams/useRestrictedTeamAdminRoute'
import { useTeam } from '../../../../../hooks/teams/useTeam'

export default function SettingsDeleteTeam() {
  const { data: team } = useTeam()
  const { mutate: deleteTeam, isLoading: deleteTeamLoading } = useDeleteTeam()
  const router = useRouter()
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
          deleteTeam(team.id)
        }
      }}
      onClose={() => {
        router.back()
      }}
    />
  )
}
