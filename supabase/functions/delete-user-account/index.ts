import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { deleteAuthUser } from '../_shared/supabase/deleteAuthUser.ts'
import { deleteTeam } from '../_shared/supabase/deleteTeam.ts'
import { deleteTeamMembersForUser } from '../_shared/supabase/deleteTeamMembersForUser.ts'
import { deleteUser } from '../_shared/supabase/deleteUser.ts'
import { fetchTeam } from '../_shared/supabase/fetchTeam.ts'
import { fetchTeamMembersForUser } from '../_shared/supabase/fetchTeamMembersForUser.ts'
import { getAuthUser } from '../_shared/supabase/getAuthUser.ts'

console.log('Hello from Delete User Account!')

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

    const teamMembers = await fetchTeamMembersForUser(user.id)

    // Delete any teams that the user is the last admin of
    const teamsToDelete: string[] = []

    // FIXME: use Promise.all
    for (const teamMember of teamMembers) {
      const team = await fetchTeam(teamMember.team_id)
      // FIXME: types
      const teamAdmins = team.team_members?.filter(
        (teamMember: any) => teamMember.role === 'admin' && teamMember.status === 'active'
      )
      const isLastAdmin = teamAdmins.length === 1

      // if the user is the last admin, delete the team
      if (isLastAdmin) {
        teamsToDelete.push(team.id)
      }
    }

    // Otherwise, remove all their team_member records
    await deleteTeamMembersForUser(user.id)

    // delete the teams (if any)
    for (const teamId of teamsToDelete) {
      await deleteTeam(teamId)
    }

    // delete the user data
    await deleteUser(user.id)

    // and the user account
    await deleteAuthUser(user.id)

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
