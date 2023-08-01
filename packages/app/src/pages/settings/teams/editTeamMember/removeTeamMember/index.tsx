import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog } from '../../../../../components/dialog/Dialog'
import { useRemoveTeamMember } from '../../../../../teams/hooks/useRemoveTeamMember'
import { useRestrictedTeamAdminRoute } from '../../../../../teams/hooks/useRestrictedTeamAdminRoute'
import { useTeam } from '../../../../../teams/hooks/useTeam'
import { useTeamMember } from '../../../../../teams/hooks/useTeamMember'
import { formatTeamMemberName } from '../../../../../utils/formatTeamMemberName'

export const SettingsRemoveTeamMember = (): ReactElement => {
  const { data: teamMember } = useTeamMember()
  const { data: team } = useTeam()
  const { mutate: removeTeamMember, isLoading } = useRemoveTeamMember()
  const navigate = useNavigate()
  useRestrictedTeamAdminRoute()

  const disabled = !team || !teamMember

  return (
    <Dialog
      open
      title="Remove team member"
      description={`Are you sure you want to remove ${formatTeamMemberName(teamMember) || teamMember?.email} from the ${
        team?.name
      } team? This action cannot be undone.`}
      confirmDisabled={disabled}
      confirmLoading={isLoading}
      confirmIsDangerous
      onConfirmClick={() => {
        if (team?.id && teamMember) {
          removeTeamMember({ teamId: team.id, teamMemberId: teamMember.id })
        }
      }}
      onClose={() => {
        navigate(-1)
      }}
    />
  )
}
