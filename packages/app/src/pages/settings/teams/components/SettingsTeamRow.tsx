import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../../components/button/Button'
import { TableCell } from '../../../../components/table/TableCell'
import { TableRow } from '../../../../components/table/TableRow'
import { routes, TEAM_ID_PARAM } from '../../../../routes'
import { useTeamMembers } from '../../../../teams/hooks/useTeamMembers'
import { Team } from '../../../../types/firebase'
import { formatDate } from '../../../../utils/formatDate'
import { formatTeamMemberName } from '../../../../utils/formatTeamMemberName'

type Props = {
  team: Team
}

export const SettingsTeamsRow = ({ team }: Props): ReactElement => {
  const { data: teamMembers } = useTeamMembers(team.id)
  const navigate = useNavigate()

  const createdByTeamMember = teamMembers?.find(teamMember => teamMember.userId === team.ownerId)

  return (
    <TableRow>
      <TableCell>{team.name}</TableCell>

      <TableCell>{formatTeamMemberName(createdByTeamMember)}</TableCell>

      <TableCell>{teamMembers?.length}</TableCell>

      <TableCell>{formatDate(team.createdAt)}</TableCell>

      <TableCell>
        <Button
          variant="light"
          onClick={() => {
            navigate(routes.settingsEditTeam.replace(TEAM_ID_PARAM, team.id.toString()))
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  )
}
