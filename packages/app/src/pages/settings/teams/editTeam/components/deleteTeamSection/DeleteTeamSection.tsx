import React, { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../../../../../components/button/Button'
import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { routes, TEAM_ID_PARAM } from '../../../../../../routes'
import { useIsLoggedInUserTeamAdmin } from '../../../../../../teams/hooks/useIsLoggedInUserTeamAdmin'

export const DeleteTeamSection = (): ReactElement => {
  const isLoggedInUserTeamAdmin = useIsLoggedInUserTeamAdmin()
  const { teamId = '' } = useParams()
  const navigate = useNavigate()

  return (
    <SettingsSection
      className="border-b-0"
      title="Delete team"
      description="Delete your team and all its data. This action cannot be undone."
    >
      <div>
        <Button
          color="red"
          disabled={!isLoggedInUserTeamAdmin}
          onClick={() => {
            navigate(routes.settingsDeleteTeam.replace(TEAM_ID_PARAM, teamId))
          }}
        >
          Yes, delete my team
        </Button>
      </div>
    </SettingsSection>
  )
}
