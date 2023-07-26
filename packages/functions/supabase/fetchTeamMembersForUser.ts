import { supabaseAdmin } from './supabaseAdmin'

export const fetchTeamMembersForUser = async (userId: string) => {
  const { data, error } = await supabaseAdmin.from('team_members').select().eq('user_id', userId)

  if (error) {
    throw error
  }

  return data
}
