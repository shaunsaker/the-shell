import { supabaseAdmin } from './supabaseAdmin'

export const deleteTeamMembersForUser = async (userId: string) => {
  const { data, error } = await supabaseAdmin.from('team_members').delete().eq('user_id', userId)

  if (error) {
    throw error
  }

  return data
}
