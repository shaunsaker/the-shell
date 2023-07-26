import { Handler } from '@netlify/functions'

import { corsHeaders } from '../../cors'
import { deleteAuthUser } from '../../supabase/deleteAuthUser'
import { deleteTeam } from '../../supabase/deleteTeam'
import { deleteTeamMembersForUser } from '../../supabase/deleteTeamMembersForUser'
import { deleteUser } from '../../supabase/deleteUser'
import { fetchTeam } from '../../supabase/fetchTeam'
import { fetchTeamMembersForUser } from '../../supabase/fetchTeamMembersForUser'
import { getAuthUser } from '../../supabase/getAuthUser'

console.log('Hello from Delete User Account!')

export const handler: Handler = async event => {
  // This is needed if you're planning to invoke your function from a browser
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: { ...corsHeaders },
    }
  }

  try {
    // Authorized api requests only
    // Retrieve the logged in user
    const {
      data: { user },
    } = await getAuthUser(event.headers.authorization)

    if (!user) {
      return {
        statusCode: 401,
        headers: { ...corsHeaders },
        body: JSON.stringify({ message: 'Unauthorized' }),
      }
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { Allow: 'POST', ...corsHeaders },
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      }
    }

    const teamMembers = await fetchTeamMembersForUser(user.id)

    // Delete any teams that the user is the last admin of
    const teamsToDelete: string[] = []

    // FIXME: use Promise.all
    for (const teamMember of teamMembers) {
      const team = await fetchTeam(teamMember.team_id)
      // FIXME: types
      const teamAdmins = team.team_members?.filter(
        (teamMember: any) => teamMember.role === 'admin' && teamMember.status === 'active',
      )
      const isLastAdmin = teamAdmins.length === 1

      // if the user is the last admin, delete the team
      if (isLastAdmin) {
        teamsToDelete.push(team.id)
      }
    }

    // Otherwise, remove all their team_member records
    await deleteTeamMembersForUser(user.id)

    // delete the teams (if any)
    for (const teamId of teamsToDelete) {
      await deleteTeam(teamId)
    }

    // delete the user data
    await deleteUser(user.id)

    // and the user account
    await deleteAuthUser(user.id)

    return {
      statusCode: 200,
      headers: { ...corsHeaders },
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { ...corsHeaders },
      body: JSON.stringify({ message: 'Internal server error' }),
    }
  }
}
