import { Button } from '@tremor/react'
import React, { ReactElement } from 'react'

import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { useResendTeamInvite } from '../../../../../../hooks/auth/useResendConfirmationEmail'
import { useTeamMember } from '../../../../../../hooks/teams/useTeamMember'

export const ResendTeamInviteSection = (): ReactElement => {
  const { data: teamMember } = useTeamMember()
  const { mutate: resendTeamInvite, isLoading } = useResendTeamInvite()

  const disabled = !teamMember?.team_id || !teamMember?.user.email

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
            if (teamMember?.team_id && teamMember?.user.email) {
              resendTeamInvite({ teamId: teamMember?.team_id, email: teamMember?.user.email })
            }
          }}
        >
          Resend invite
        </Button>
      </div>
    </SettingsSection>
  )
}
