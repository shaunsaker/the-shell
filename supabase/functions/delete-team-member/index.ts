import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { deleteTeamMember } from '../_shared/supabase/deleteTeamMember.ts'
import { fetchTeam } from '../_shared/supabase/fetchTeam.ts'
import { fetchTeamMember } from '../_shared/supabase/fetchTeamMember.ts'
import { getAuthUser } from '../_shared/supabase/getAuthUser.ts'

console.log('Hello from Delete Team Member!')

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

    // Destructure the data from the POST body
    const { id } = await request.json()

    // Verify that the logged in user is an admin of the team
    const teamMember = await fetchTeamMember(id)

    if (teamMember.role !== 'admin') {
      return new Response(
        JSON.stringify({
          error: {
            statusCode: 403,
            message: 'You need to be a team admin to delete a team.',
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

    // Verify that the team member is not the last admin of the team
    const team = await fetchTeam(teamMember.team_id)
    // FIXME: types
    const teamAdmins = team.team_members?.filter(
      (teamMember: any) => teamMember.role === 'admin' && teamMember.status === 'active'
    )

    if (teamAdmins.length === 1) {
      return new Response(
        JSON.stringify({
          error: {
            statusCode: 403,
            message:
              'You cannot remove the last admin of a team. First assign another team member as admin, then remove this one.',
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

    // If so, delete the team member
    await deleteTeamMember(id)

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
