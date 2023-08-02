import React, { ReactElement, useEffect, useState } from 'react'

import { Button } from '../../../../../../components/button/Button'
import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../../../../components/skeletonLoader/SkeletonLoader'
import { TextInput } from '../../../../../../components/textInput/TextInput'
import { useIsLoggedInUserTeamAdmin } from '../../../../../../teams/hooks/useIsLoggedInUserTeamAdmin'
import { useTeam } from '../../../../../../teams/hooks/useTeam'
import { useUpdateTeam } from '../../../../../../teams/hooks/useUpdateTeam'

export const ChangeTeamNameSection = (): ReactElement => {
  const isLoggedInUserTeamAdmin = useIsLoggedInUserTeamAdmin()
  const { data: team, isLoading: teamsLoading } = useTeam()
  const { mutate: updateTeam, isLoading: updateTeamLoading } = useUpdateTeam()

  const [teamName, setTeamName] = useState('')

  const disabled = !teamName || teamName === team?.name || teamsLoading || updateTeamLoading

  // if the team name changes update state
  useEffect(() => {
    setTeamName(team?.name || '')
  }, [team?.name])

  return (
    <SettingsSection title="Change team name" description="Update your team name.">
      {teamsLoading ? (
        <SkeletonLoader />
      ) : (
        <TextInput
          placeholder="Enter a team name..."
          disabled={!isLoggedInUserTeamAdmin}
          value={teamName}
          onChange={event => {
            setTeamName(event.target.value)
          }}
        />
      )}

      <div>
        <Button
          loading={updateTeamLoading}
          disabled={disabled}
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
