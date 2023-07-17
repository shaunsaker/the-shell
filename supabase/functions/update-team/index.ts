import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { fetchTeamMemberForTeam } from '../_shared/supabase/fetchTeamMemberForTeam.ts'
import { getAuthUser } from '../_shared/supabase/getAuthUser.ts'
import { updateTeamRecord } from '../_shared/supabase/updateTeamRecord.ts'

console.log('Hello from Update Team!')

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

  // Destructure the data from the POST body
  const { id, name } = await request.json()

  try {
    // Retrieve the logged in user
    const {
      data: { user },
    } = await getAuthUser(request)

    if (!user) {
      return new Response(
        JSON.stringify({
          error: { statusCode: 401, message: 'Unauthorized' },
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

    // Verify that the logged in user is an admin of the team
    const teamMember = await fetchTeamMemberForTeam({ teamId: id, userId: user.id })

    if (teamMember.role !== 'admin') {
      return new Response(
        JSON.stringify({
          error: {
            statusCode: 403,
            message: 'You need to be a team admin to update a team.',
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

    // Update the team
    const team = await updateTeamRecord({ id, name })

    return new Response(JSON.stringify(team), {
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
