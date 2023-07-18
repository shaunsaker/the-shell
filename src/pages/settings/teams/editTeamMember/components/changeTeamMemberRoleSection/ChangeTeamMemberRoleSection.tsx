import { Button, Select, SelectItem } from '@tremor/react'
import React, { ReactElement, useEffect, useState } from 'react'

import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../../../../components/skeletonLoader/SkeletonLoader'
import { useTeamMember } from '../../../../../../hooks/teams/useTeamMember'
import { useUpdateTeamMember } from '../../../../../../hooks/teams/useUpdateTeamMember'
import { TeamMemberRole } from '../../../../../../models'
import { formatTeamMemberRole } from '../../../../../../utils/formatTeamMemberRole'
import { parseTeamMemberRole } from '../../../../../../utils/parseTeamMemberRole'

const TEAM_MEMBER_ROLES: TeamMemberRole[] = ['admin', 'member']

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
        <Select value={role} onValueChange={setRole}>
          {TEAM_MEMBER_ROLES.map(role => (
            <SelectItem key={role} value={role}>
              {formatTeamMemberRole(role)}
            </SelectItem>
          ))}
        </Select>
      )}

      <div>
        <Button
          loading={updateTeamMemberLoading}
          disabled={disabled}
          onClick={() => {
            if (teamMember && role) {
              updateTeamMember({ id: teamMember.id, role: parseTeamMemberRole(role) })
            }
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
