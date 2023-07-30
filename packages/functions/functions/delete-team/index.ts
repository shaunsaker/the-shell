import { Handler } from '@netlify/functions'

import { getAuthUser } from '../../auth/getAuthUser'
import { sendTeamDeletedEmail } from '../../emails/sendTeamDeletedEmail'
import { deleteTeam } from '../../teams/deleteTeam'
import { fetchTeam } from '../../teams/fetchTeam'
import { corsHeaders } from '../../utils/cors'
import { formatName } from '../../utils/formatName'

console.log('Hello from Delete Team!')

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

    if (!event.body) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders },
        body: JSON.stringify({ message: 'Missing POST body' }),
      }
    }

    // Destructure the data from the POST body
    const { teamId } = JSON.parse(event.body)

    const team = await fetchTeam(teamId)

    // Verify that the logged in user is an admin of the team
    const adminTeamMember = team.team_members.find(teamMember => teamMember.user_id === user.id)

    if (!adminTeamMember) {
      return {
        statusCode: 403,
        headers: { ...corsHeaders },
        body: JSON.stringify({ message: 'Team admin not found.' }),
      }
    }

    if (adminTeamMember.role !== 'admin') {
      return {
        statusCode: 403,
        headers: { ...corsHeaders },
        body: JSON.stringify({ message: 'You need to be a team admin to remove team members.' }),
      }
    }

    await deleteTeam(teamId)

    const adminTeamMemberName = formatName(adminTeamMember)

    // notify team members that the team has been deleted
    for await (const teamMember of team.team_members) {
      const isCurrentUser = teamMember.user_id === user.id

      if (!isCurrentUser && teamMember.email) {
        await sendTeamDeletedEmail({
          userEmail: teamMember.email,
          userName: formatName(teamMember),
          teamName: team.name,
          teamMemberName: adminTeamMemberName,
        })
      }
    }

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
