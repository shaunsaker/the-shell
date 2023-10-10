import { Button, SkeletonLoader, TextInput } from 'components'
import React, { ReactElement, useEffect, useState } from 'react'

import { SettingsSection } from '@/components/settingsSection/SettingsSection'
import { useIsLoggedInUserTeamAdmin } from '@/teams/hooks/useIsLoggedInUserTeamAdmin'
import { useTeam } from '@/teams/hooks/useTeam'
import { useUpdateTeam } from '@/teams/hooks/useUpdateTeam'

export const ChangeTeamNameSection = (): ReactElement => {
  const { data: isLoggedInUserTeamAdmin, isLoading: isLoggedInUserTeamAdminLoading } = useIsLoggedInUserTeamAdmin()
  const { data: team, isLoading: teamsLoading } = useTeam()
  const { mutate: updateTeam, isLoading: updateTeamLoading } = useUpdateTeam()

  const [teamName, setTeamName] = useState('')

  const isLoading = isLoggedInUserTeamAdminLoading || teamsLoading
  const inputDisabled = isLoading || !isLoggedInUserTeamAdmin
  const teamNameUnchanged = teamName === team?.name
  const buttonDisabled = isLoading || !teamName || teamNameUnchanged || updateTeamLoading

  // if the team name changes update state
  useEffect(() => {
    setTeamName(team?.name || '')
  }, [team?.name])

  return (
    <SettingsSection className="border-b-0" title="Change team name" description="Update your team name.">
      {teamsLoading ? (
        <SkeletonLoader />
      ) : (
        <TextInput
          placeholder="Enter a team name..."
          disabled={inputDisabled}
          value={teamName}
          onChange={event => {
            setTeamName(event.target.value)
          }}
        />
      )}

      <div>
        <Button
          loading={updateTeamLoading}
          disabled={buttonDisabled}
          onClick={() => {
            if (team) {
              updateTeam({ id: team.id, name: teamName })
            }
          }}
        >
          Save
        </Button>
      </div>
    </SettingsSection>
  )
}
