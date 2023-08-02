import React, { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../../../../../components/button/Button'
import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../../../../../routes'

export const RemoveTeamMemberSection = (): ReactElement => {
  const { teamId = '', teamMemberId = '' } = useParams()
  const navigate = useNavigate()

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
            navigate(
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
