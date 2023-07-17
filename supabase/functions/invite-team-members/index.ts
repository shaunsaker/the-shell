import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { fetchTeam } from '../_shared/supabase/fetchTeam.ts'
import { fetchTeamMemberForTeam } from '../_shared/supabase/fetchTeamMemberForTeam.ts'
import { fetchUsersByEmails } from '../_shared/supabase/fetchUsersByEmails.ts'
import { getAuthUser } from '../_shared/supabase/getAuthUser.ts'
import { insertTeamMemberRecords } from '../_shared/supabase/insertTeamMemberRecords.ts'
import { inviteUserByEmail } from '../_shared/supabase/inviteUserByEmail.ts'

console.log('Hello from Invite Team Members!')

serve(async (request): Promise<Response> => {
  // This is needed if you're planning to invoke your function from a browser
  if (request.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      headers: { ...corsHeaders, Allow: 'POST' },
      status: 405,
    })
  }

  try {
    // Retrieve the logged in user
    const {
      data: { user },
    } = await getAuthUser(request)

    if (!user) {
      return new Response(
        JSON.stringify({
          error: { message: 'Unauthorized' },
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 401,
        }
      )
    }

    // Destructure the data from the POST body
    const { teamId, emails } = await request.json()

    // Verify that the logged in user is an admin of the team
    const teamMember = await fetchTeamMemberForTeam({ teamId, userId: user.id })

    if (teamMember.role !== 'admin') {
      return new Response(
        JSON.stringify({
          error: {
            message: 'You need to be a team admin to invite team members.',
          },
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 403,
        }
      )
    }

    const team = await fetchTeam(parseInt(teamId))

    // Filter out the emails that don't already belong to the team
    // FIXME: types
    const newEmails = (emails as string[]).filter(
      // FIXME: types
      email => !team.team_members?.find((member: any) => member.user.email === email)
    )

    // If any of the emails, have a user account, we send them an email saying they have been added to the team
    // otherwise, we send them an email with a link to sign up
    const users = (await fetchUsersByEmails(newEmails))
      // exclude users that are waiting for verification
      // FIXME: this could be improved by checking if the user has a verified_at date
      .filter(user => user.first_name && user.last_name)

    // // TODO: SS notify the users above via email that they have been added to the team
    // for (const user of users) {
    // }

    const newTeamMembers = users.map(user => ({
      teamId: team.id,
      userId: user.id,
      role: 'member',
      status: 'active',
    }))

    // If not, send them an email with a link to sign up
    // FIXME: types
    const invitees = (newEmails as string[]).filter(email => !users.find(user => user.email === email))

    // FIXME: use Promise.all
    for (const invitee of invitees) {
      const user = await inviteUserByEmail(invitee)

      if (user.user.id) {
        newTeamMembers.push({
          teamId: team.id,
          userId: user.user.id,
          role: 'member',
          status: 'invited',
        })
      }
    }

    // Finally, add all the users to the team
    await insertTeamMemberRecords(newTeamMembers)

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify(error), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    })
  }
})
