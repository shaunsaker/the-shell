import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { TeamWithMembers } from 'types'

import { Button } from '../../../../components/button/Button'
import { TableCell } from '../../../../components/table/TableCell'
import { TableRow } from '../../../../components/table/TableRow'
import { routes, TEAM_ID_PARAM } from '../../../../routes'
import { formatDate } from '../../../../utils/formatDate'
import { formatTeamMemberName } from '../../../../utils/formatTeamMemberName'

type Props = {
  team: TeamWithMembers
}

export const SettingsTeamsRow = ({ team }: Props): ReactElement => {
  const navigate = useNavigate()

  const createdByTeamMember = team.members?.find(teamMember => teamMember.userId === team.ownerId)

  return (
    <TableRow>
      <TableCell>{team.name}</TableCell>

      <TableCell>{formatTeamMemberName(createdByTeamMember)}</TableCell>

      <TableCell>{team.members.length}</TableCell>

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
