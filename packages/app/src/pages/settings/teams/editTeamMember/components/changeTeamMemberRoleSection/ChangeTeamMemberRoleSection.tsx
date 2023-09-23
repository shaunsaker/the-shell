import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TeamMemberRole } from 'types'

import { Alert } from '../../../../../../components/alert/Alert'
import { Button } from '../../../../../../components/button/Button'
import { Select } from '../../../../../../components/select/Select'
import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../../../../components/skeletonLoader/SkeletonLoader'
import { useIsTeamMemberLastAdmin } from '../../../../../../teams/hooks/useIsTeamMemberLastAdmin'
import { useTeam } from '../../../../../../teams/hooks/useTeam'
import { useUpdateTeamMemberRole } from '../../../../../../teams/hooks/useUpdateTeamMemberRole'
import { formatTeamMemberRole } from '../../../../../../utils/formatTeamMemberRole'
import { parseTeamMemberRole } from '../../../../../../utils/parseTeamMemberRole'

const TEAM_MEMBER_ROLES: TeamMemberRole[] = [TeamMemberRole.Admin, TeamMemberRole.Member]
const TEAM_MEMBER_ROLE_OPTIONS = TEAM_MEMBER_ROLES.map(role => ({
  label: formatTeamMemberRole(role),
  value: role,
}))

export const ChangeTeamMemberRoleSection = (): ReactElement => {
  const { teamMemberId = '' } = useParams()
  const { data: team, isLoading: teamLoading } = useTeam()
  const [role, setRole] = useState('')
  const { mutate: updateTeamMemberRole, isLoading: updateTeamMemberLoading } = useUpdateTeamMemberRole()
  const { data: isTeamMemberLastAdmin, isLoading: isTeamMemberLastAdminLoading } = useIsTeamMemberLastAdmin()

  const teamMember = team?.members.find(member => member.id === teamMemberId)
  const isLoading = teamLoading || isTeamMemberLastAdminLoading
  const disabled = isLoading || role === teamMember?.role || !role

  useEffect(() => {
    setRole(teamMember?.role || '')
  }, [teamMember?.role])

  return (
    <SettingsSection title="Change role" description="Change the team member's role.">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {isTeamMemberLastAdmin && (
            <Alert kind="info">You are the last admin of the team and cannot change your role to member.</Alert>
          )}

          <Select
            value={role}
            options={TEAM_MEMBER_ROLE_OPTIONS}
            // we don't want to allow the last admin to change their role to member
            disabled={isTeamMemberLastAdmin}
            onValueChange={role => setRole(role.value)}
          />
        </>
      )}

      <div>
        <Button
          loading={updateTeamMemberLoading}
          disabled={disabled}
          onClick={() => {
            if (teamMember && role) {
              updateTeamMemberRole({
                teamId: teamMember.teamId,
                teamMemberId: teamMember.id,
                role: parseTeamMemberRole(role),
              })
            }
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
