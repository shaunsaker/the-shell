import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { fetchTeam } from '../_shared/supabase/fetchTeam.ts'
import { fetchTeamMemberForTeam } from '../_shared/supabase/fetchTeamMemberForTeam.ts'
import { getAuthUser } from '../_shared/supabase/getAuthUser.ts'
import { updateTeamMemberRecord } from '../_shared/supabase/updateTeamMemberRecord.ts'

console.log('Hello from Update Team Member!')

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
  const { id, teamId, role } = await request.json()

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

    // Verify that the logged in user is an admin of the team
    const teamMember = await fetchTeamMemberForTeam({ teamId, userId: user.id })

    if (teamMember.role !== 'admin') {
      return new Response(
        JSON.stringify({
          error: {
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

    if (role === 'member') {
      // If the team member is the last admin, don't allow the update
      const team = await fetchTeam(teamId)
      // FIXME: types
      const teamAdmins = team.team_members?.filter(
        (teamMember: any) => teamMember.role === 'admin' && teamMember.status === 'active'
      )
      const isLastAdmin = teamAdmins.length === 1

      if (isLastAdmin) {
        return new Response(
          JSON.stringify({
            error: {
              message: 'You cannot update your role to member because there must be at least one team admin.',
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
    }

    // Update the team member
    const updatedTeamMember = await updateTeamMemberRecord({ id, role })

    return new Response(JSON.stringify(updatedTeamMember), {
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
