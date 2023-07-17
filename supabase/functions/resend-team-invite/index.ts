import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { fetchTeamMemberForTeam } from '../_shared/supabase/fetchTeamMemberForTeam.ts'
import { getAuthUser } from '../_shared/supabase/getAuthUser.ts'
import { inviteUserByEmail } from '../_shared/supabase/inviteUserByEmail.ts'

console.log('Hello from Resend Team Member Invite!')

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
    const { teamId, email } = await request.json()

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

    await inviteUserByEmail(email)

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
