import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRestrictedSubscriptionRoute } from '../../../../../billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '../../../../../billing/hooks/useRestrictedTeamPlanRoute'
import { Dialog } from '../../../../../components/dialog/Dialog'
import { routes } from '../../../../../router/routes'
import { useRemoveTeamMember } from '../../../../../teams/hooks/useRemoveTeamMember'
import { useRestrictedTeamAdminRoute } from '../../../../../teams/hooks/useRestrictedTeamAdminRoute'
import { useTeam } from '../../../../../teams/hooks/useTeam'
import { useTeamMember } from '../../../../../teams/hooks/useTeamMember'
import { formatTeamMemberName } from '../../../../../utils/formatTeamMemberName'

export const SettingsRemoveTeamMember = (): ReactElement => {
  useRestrictedSubscriptionRoute()
  useRestrictedTeamPlanRoute()
  useRestrictedTeamAdminRoute()
  const { data: team, isLoading: teamLoading } = useTeam()
  const { data: teamMember, isLoading: teamMemberLoading } = useTeamMember()
  const { mutate: removeTeamMember, isLoading: removeTeamMemberLoading } = useRemoveTeamMember()
  const navigate = useNavigate()

  const isLoading = teamLoading || teamMemberLoading || removeTeamMemberLoading
  const disabled = isLoading

  return (
    <Dialog
      open
      title="Remove team member"
      description={`Are you sure you want to remove ${formatTeamMemberName(teamMember) || teamMember?.email} from the ${
        team?.name
      } team? This action cannot be undone.`}
      confirmDisabled={disabled}
      confirmLoading={removeTeamMemberLoading}
      confirmIsDangerous
      onConfirmClick={() => {
        if (team?.id && teamMember) {
          removeTeamMember({
            teamId: teamMember.teamId,
            teamMemberId: teamMember.id,
          })
        }
      }}
      onClose={() => {
        navigate(routes.back)
      }}
    />
  )
}
