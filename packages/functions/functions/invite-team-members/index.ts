import { Handler } from '@netlify/functions'

import { corsHeaders } from '../../cors'
import { fetchTeam } from '../../supabase/fetchTeam'
import { fetchTeamMemberForTeam } from '../../supabase/fetchTeamMemberForTeam'
import { fetchUsersByEmails } from '../../supabase/fetchUsersByEmails'
import { getAuthUser } from '../../supabase/getAuthUser'
import { insertTeamMemberRecords } from '../../supabase/insertTeamMemberRecords'
import { inviteUserByEmail } from '../../supabase/inviteUserByEmail'

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

    // Verify that the logged in user is an admin of the team
    const teamMember = await fetchTeamMemberForTeam({ teamId, userId: user.id })

    if (teamMember.role !== 'admin') {
      return {
        statusCode: 403,
        headers: { ...corsHeaders },
        body: JSON.stringify({ message: 'You need to be a team admin to invite team members.' }),
      }
    }

    const team = await fetchTeam(parseInt(teamId))

    // Filter out the emails that don't already belong to the team
    // FIXME: types
    const newEmails = (emails as string[]).filter(
      // FIXME: types
      email => !team.team_members?.find((member: any) => member.user.email === email),
    )

    // If any of the emails, have a user account, we send them an email saying they have been added to the team
    // otherwise, we send them an email with a link to sign up
    const users = await fetchUsersByEmails(newEmails)

    // // TODO: SS notify the users above via email that they have been added to the team
    // for (const user of users) {
    // }

    const newTeamMembers = users.map(user => ({
      teamId: team.id,
      userId: user.id,
      role: 'member',
      status: 'active',
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
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
    await insertTeamMemberRecords(newTeamMembers)

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
