import { supabaseAdmin } from './supabaseAdmin.ts'

export const fetchTeamMembersForUser = async (userId: string) => {
  const { data, error } = await supabaseAdmin.from('team_members').select().eq('user_id', userId).single()

  if (error) {
    throw error
  }

  return data
}
