import { Team, TeamMember, TeamWithMembers } from 'types'

import { makeTeam } from './makeTeam'
import { makeTeamMember } from './makeTeamMember'

export const makeTeamWithMembers = ({
  team: partialTeam,
  teamMembers: partialTeamMembers,
}: {
  team: Partial<Team>
  teamMembers: Array<Partial<TeamMember>>
}): TeamWithMembers => {
  const team = makeTeam(partialTeam)
  const teamMembers = partialTeamMembers.map(makeTeamMember)
  const teamWithTeamMembers: TeamWithMembers = {
    ...team,
    members: teamMembers,
  }

  return teamWithTeamMembers
}
