import { Button } from '@tremor/react'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

import { SettingsSection } from '../../../../../../../../components/settingsSection/SettingsSection'
import { useTeamIdParam } from '../../../../../../../../hooks/teams/useTeamIdParam'
import { useTeamMemberIdParam } from '../../../../../../../../hooks/teams/useTeamMemberIdParam'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../../../../../../../routes'

export const RemoveTeamMemberSection = (): ReactElement => {
  const router = useRouter()
  const teamId = useTeamIdParam()
  const teamMemberId = useTeamMemberIdParam()

  return (
    <SettingsSection
      className="border-b-0"
      title="Remove team member"
      description="Remove this team member from your team. This action cannot be undone."
    >
      <div>
        <Button
          color="red"
          onClick={() => {
            router.push(
              routes.settingsRemoveTeamMember
                .replace(TEAM_ID_PARAM, teamId)
                .replace(TEAM_MEMBER_ID_PARAM, teamMemberId),
            )
          }}
        >
          Yes, remove team member
        </Button>
      </div>
    </SettingsSection>
  )
}
