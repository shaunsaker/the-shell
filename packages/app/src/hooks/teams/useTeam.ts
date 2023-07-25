import { useTeamIdParam } from './useTeamIdParam'
import { useTeams } from './useTeams'

export const useTeam = () => {
  const { data: teams, ...teamsQuery } = useTeams()
  const teamId = useTeamIdParam()

  const team = teams?.find(team => team.id === parseInt(teamId))

  return {
    data: team,
    ...teamsQuery,
  }
}
