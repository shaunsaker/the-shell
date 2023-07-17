import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const createTeam = async ({ name, userId }: { name: string; userId: string }) => {
  const { data: team, error: insertTeamError } = await supabase
    .from('teams')
    .insert([
      {
        name,
        created_by: userId,
      },
    ])
    .select()
    .single()

  if (insertTeamError) {
    await handleApiError(insertTeamError)
  }

  if (!team) {
    throw new Error('Missing team!')
  }

  // add the user as a team member with the admin role
  const { error: insertTeamMemberError } = await supabase.from('team_members').insert([
    {
      team_id: team.id,
      user_id: userId,
      role: 'admin',
      status: 'active',
    },
  ])

  if (insertTeamMemberError) {
    await handleApiError(insertTeamMemberError)
  }

  return team
}
