import React, { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Alert } from '../../../../../../components/alert/Alert'
import { Button } from '../../../../../../components/button/Button'
import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../../../../components/skeletonLoader/SkeletonLoader'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../../../../../router/routes'
import { useIsTeamMemberLastAdmin } from '../../../../../../teams/hooks/useIsTeamMemberLastAdmin'

export const RemoveTeamMemberSection = (): ReactElement => {
  const { teamId = '', teamMemberId = '' } = useParams()
  const { data: isTeamMemberLastAdmin, isLoading: isTeamMemberLastAdminLoading } = useIsTeamMemberLastAdmin()
  const navigate = useNavigate()

  const isLoading = isTeamMemberLastAdminLoading
  const disabled = isLoading || isTeamMemberLastAdmin

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
          {isTeamMemberLastAdmin && (
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
