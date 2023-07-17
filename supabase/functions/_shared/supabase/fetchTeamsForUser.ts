import { fetchTeamMembersForUser } from './fetchTeamMembersForUser.ts'
import { supabaseAdmin } from './supabaseAdmin.ts'

// FIXME: there is probably a more SQL-y way to do this
export const fetchTeamsForUser = async (userId: string) => {
  const teamMembers = await fetchTeamMembersForUser(userId)

  const teamIds = teamMembers?.map(teamMember => teamMember.team_id) || []

  const { data: teams, error: teamsError } = await supabaseAdmin
    .from('teams')
    .select(`*, team_members: team_members ( *, user: user_id ( first_name, last_name, email ) )`)
    .in('id', teamIds)

  if (teamsError) {
    throw teamsError
  }

  return teams
}
