import React, { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TeamMemberRole } from 'types'

import { Alert } from '../../../../../../components/alert/Alert'
import { Button } from '../../../../../../components/button/Button'
import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../../../../components/skeletonLoader/SkeletonLoader'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../../../../../router/routes'
import { useTeam } from '../../../../../../teams/hooks/useTeam'

export const RemoveTeamMemberSection = (): ReactElement => {
  const { teamId = '', teamMemberId = '' } = useParams()
  const { data: team, isLoading: teamLoading } = useTeam()
  const navigate = useNavigate()

  const isLastAdminAndOtherMembers =
    team?.members.filter(member => member.id === teamMemberId && member.role === TeamMemberRole.Admin).length === 1 &&
    team?.members.length > 1
  const isLoading = teamLoading
  const disabled = isLoading || isLastAdminAndOtherMembers

  return (
    <SettingsSection
      className="border-b-0"
      title="Remove team member"
      description="Remove this team member from your team. This action cannot be undone."
    >
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {isLastAdminAndOtherMembers && (
            <Alert kind="info">
              You are the last admin of the team and there are other team members. To remove yourself from the team,
              first assign another team member as admin.
            </Alert>
          )}

          <div>
            <Button
              color="red"
              disabled={disabled}
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
        </>
      )}
    </SettingsSection>
  )
}
