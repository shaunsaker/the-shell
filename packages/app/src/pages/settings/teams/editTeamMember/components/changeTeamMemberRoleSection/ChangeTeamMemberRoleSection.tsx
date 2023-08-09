import React, { ReactElement, useEffect, useState } from 'react'

import { Button } from '../../../../../../components/button/Button'
import { Select } from '../../../../../../components/select/Select'
import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../../../../components/skeletonLoader/SkeletonLoader'
import { TeamMemberRole } from '../../../../../../models'
import { useTeamMember } from '../../../../../../teams/hooks/useTeamMember'
import { useUpdateTeamMember } from '../../../../../../teams/hooks/useUpdateTeamMember'
import { formatTeamMemberRole } from '../../../../../../utils/formatTeamMemberRole'
import { parseTeamMemberRole } from '../../../../../../utils/parseTeamMemberRole'

const TEAM_MEMBER_ROLES: TeamMemberRole[] = ['admin', 'member']
const TEAM_MEMBER_ROLE_OPTIONS = TEAM_MEMBER_ROLES.map(role => ({
  label: formatTeamMemberRole(role),
  value: role,
}))

export const ChangeTeamMemberRoleSection = (): ReactElement => {
  const { data: teamMember, isLoading } = useTeamMember()
  const [role, setRole] = useState('')
  const { mutate: updateTeamMember, isLoading: updateTeamMemberLoading } = useUpdateTeamMember()

  const disabled = isLoading || role === teamMember?.role || !role

  useEffect(() => {
    setRole(teamMember?.role || '')
  }, [teamMember?.role])

  return (
    <SettingsSection title="Change role" description="Change the team member's role.">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <Select value={role} options={TEAM_MEMBER_ROLE_OPTIONS} onValueChange={setRole} />
      )}

      <div>
        <Button
          loading={updateTeamMemberLoading}
          disabled={disabled}
          onClick={() => {
            if (teamMember && role) {
              updateTeamMember({
                id: teamMember.id,
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
