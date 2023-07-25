import { useTeam } from './useTeam'
import { useTeamMemberIdParam } from './useTeamMemberIdParam'

export const useTeamMember = () => {
  const { data: team, ...teamsQuery } = useTeam()
  const teamMemberId = useTeamMemberIdParam()

  const teamMember = team?.team_members.find(teamMember => teamMember.id === parseInt(teamMemberId))

  return {
    data: teamMember,
    ...teamsQuery,
  }
}
