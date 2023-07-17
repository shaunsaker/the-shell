import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { getAuthUser } from '../_shared/supabase/getAuthUser.ts'
import { insertTeamMemberRecords } from '../_shared/supabase/insertTeamMemberRecords.ts'
import { insertTeamRecord } from '../_shared/supabase/insertTeamRecord.ts'

console.log('Hello from Create Team!')

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
  const { name } = await request.json()

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

    // Create a new team
    const team = await insertTeamRecord({ name, createdById: user.id })

    // Create a new team member with Admin role for the team using the current user
    await insertTeamMemberRecords([
      {
        teamId: team.id,
        userId: user.id,
        role: 'admin',
        status: 'active',
      },
    ])

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
