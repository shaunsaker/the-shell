import { Button } from '@tremor/react'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { useIsLoggedInUserTeamAdmin } from '../../../../../../hooks/teams/useIsLoggedInUserTeamAdmin'
import { useTeamIdParam } from '../../../../../../hooks/teams/useTeamIdParam'
import { routes, TEAM_ID_PARAM } from '../../../../../../routes'

export const DeleteTeamSection = (): ReactElement => {
  const isLoggedInUserTeamAdmin = useIsLoggedInUserTeamAdmin()
  const router = useRouter()
  const teamId = useTeamIdParam()

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
            router.push(routes.settingsDeleteTeam.replace(TEAM_ID_PARAM, teamId))
          }}
        >
          Yes, delete my team
        </Button>
      </div>
    </SettingsSection>
  )
}
