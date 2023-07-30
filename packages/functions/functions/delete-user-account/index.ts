import { Handler } from '@netlify/functions'

import { deleteAuthUser } from '../../auth/deleteAuthUser'
import { getAuthUser } from '../../auth/getAuthUser'
import { sendTeamDeletedEmail } from '../../emails/sendTeamDeletedEmail'
import { deleteTeam } from '../../teams/deleteTeam'
import { deleteTeamMembersForUser } from '../../teams/deleteTeamMembersForUser'
import { fetchTeam } from '../../teams/fetchTeam'
import { fetchTeamMembersForUser } from '../../teams/fetchTeamMembersForUser'
import { deleteUser } from '../../users/deleteUser'
import { corsHeaders } from '../../utils/cors'
import { formatName } from '../../utils/formatName'

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
    const teamsToDelete: Array<Awaited<ReturnType<typeof fetchTeam>>> = []

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
        teamsToDelete.push(team)
      }
    }

    // Otherwise, remove all their team_member records
    await deleteTeamMembersForUser(user.id)

    // delete the teams (if any)
    for (const team of teamsToDelete) {
      await deleteTeam(team.id)

      // notify team members that the team has been deleted
      const adminTeamMember = team.team_members.find(teamMember => teamMember.user_id === user.id)

      if (!adminTeamMember) {
        return {
          statusCode: 403,
          headers: { ...corsHeaders },
          body: JSON.stringify({ message: 'Team admin not found.' }),
        }
      }

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
