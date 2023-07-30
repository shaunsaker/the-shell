import { Button } from '@tremor/react'
import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'

import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { useResendTeamInvite } from '../../../../../../hooks/auth/useResendConfirmationEmail'
import { useTeamMember } from '../../../../../../hooks/teams/useTeamMember'
import { routes, TEAM_ID_PARAM } from '../../../../../../routes'

export const ResendTeamInviteSection = (): ReactElement => {
  const { data: teamMember } = useTeamMember()
  const { mutate: resendTeamInvite, isLoading } = useResendTeamInvite()
  const { teamId = '' } = useParams()

  const disabled = !teamMember?.team_id || !teamMember?.email

  return (
    <SettingsSection
      title="Resend team invite"
      description="Resend the team invite to the team member. This will invalidate the previous invite link."
    >
      <div>
        <Button
          disabled={disabled}
          loading={isLoading}
          onClick={() => {
            if (teamMember?.team_id && teamMember?.email) {
              resendTeamInvite({
                teamId: teamMember.team_id,
                email: teamMember.email,
                redirectTo: `${window.location.origin}${routes.settingsAcceptInvite.replace(TEAM_ID_PARAM, teamId)}`,
              })
            }
          }}
        >
          Resend invite
        </Button>
      </div>
    </SettingsSection>
  )
}