import { Handler } from '@netlify/functions'

import { getAuthUser } from '../../auth/getAuthUser'
import { inviteUserByEmail } from '../../auth/inviteUserByEmail'
import { sendAddedUserToTeamEmail } from '../../emails/sendAddedUserToTeamEmail'
import { addTeamMembers } from '../../teams/addTeamMembers'
import { fetchTeam } from '../../teams/fetchTeam'
import { fetchUsersByEmails } from '../../users/fetchUsersByEmails'
import { corsHeaders } from '../../utils/cors'
import { formatName } from '../../utils/formatName'

console.log('Hello from Invite Team Members!')

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
    const { teamId, emails, redirectTo } = JSON.parse(event.body)

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

    // Filter out the emails that don't already belong to the team
    const newEmails = (emails as string[]).filter(
      email => !team.team_members?.find(teamMember => teamMember.email === email),
    )

    // If any of the emails, have a user account, we send them an email saying they have been added to the team
    // otherwise, we send them an email with a link to sign up
    const users = await fetchUsersByEmails(newEmails)

    // notify the users above via email that they have been added to the team
    for (const user of users) {
      if (user.email) {
        await sendAddedUserToTeamEmail({
          userEmail: user.email,
          userName: formatName(user),
          teamName: team.name,
          teamMemberName: formatName(adminTeamMember),
        })
      }
    }

    const newTeamMembers = users.map(user => ({
      teamId: team.id,
      userId: user.id,
      role: 'member',
      status: 'active',
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email || '',
    }))

    // If not, send them an email with a link to sign up
    // FIXME: types
    const invitees = (newEmails as string[]).filter(email => !users.find(user => user.email === email))

    // FIXME: use Promise.all
    for (const invitee of invitees) {
      const user = await inviteUserByEmail({ email: invitee, redirectTo })

      if (user.user.id) {
        newTeamMembers.push({
          teamId: team.id,
          userId: user.user.id,
          role: 'member',
          status: 'invited',
          firstName: '',
          lastName: '',
          email: invitee,
        })
      }
    }

    // Finally, add all the users to the team
    await addTeamMembers(newTeamMembers)

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
