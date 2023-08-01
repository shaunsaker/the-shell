import { useParams } from 'react-router-dom'

import { useTeam } from './useTeam'

export const useTeamMember = () => {
  const { teamMemberId = '' } = useParams()
  const { data: team, ...teamsQuery } = useTeam()

  const teamMember = team?.team_members.find(teamMember => teamMember.id === parseInt(teamMemberId))

  return {
    data: teamMember,
    ...teamsQuery,
  }
}
