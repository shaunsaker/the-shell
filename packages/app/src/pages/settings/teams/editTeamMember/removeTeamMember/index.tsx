import React, { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useRestrictedSubscriptionRoute } from '../../../../../billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '../../../../../billing/hooks/useRestrictedTeamPlanRoute'
import { Dialog } from '../../../../../components/dialog/Dialog'
import { useRemoveTeamMember } from '../../../../../teams/hooks/useRemoveTeamMember'
import { useRestrictedTeamAdminRoute } from '../../../../../teams/hooks/useRestrictedTeamAdminRoute'
import { useTeam } from '../../../../../teams/hooks/useTeam'
import { formatTeamMemberName } from '../../../../../utils/formatTeamMemberName'

export const SettingsRemoveTeamMember = (): ReactElement => {
  useRestrictedSubscriptionRoute()
  useRestrictedTeamPlanRoute()
  useRestrictedTeamAdminRoute()
  const { teamMemberId = '' } = useParams()
  const { data: team } = useTeam()
  const { mutate: removeTeamMember, isLoading } = useRemoveTeamMember()
  const navigate = useNavigate()

  const teamMember = team?.members.find(member => member.id === teamMemberId)
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
          removeTeamMember({
            teamId: team.id,
            teamMemberId: teamMember.id,
            isLastTeamMember: team.members?.length === 1,
          })
        }
      }}
      onClose={() => {
        navigate(-1)
      }}
    />
  )
}
