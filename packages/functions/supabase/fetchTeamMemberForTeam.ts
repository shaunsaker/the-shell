import { supabaseAdmin } from './supabaseAdmin'

export const fetchTeamMemberForTeam = async ({ teamId, userId }: { teamId: string; userId: string }) => {
  const { data, error } = await supabaseAdmin
    .from('team_members')
    .select()
    .eq('team_id', teamId)
    .eq('user_id', userId)
    .single()

  if (error) {
    throw error
  }

  return data
}
