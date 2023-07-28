import { supabaseAdmin } from './supabaseAdmin'

export const fetchTeamMembers = async (teamMemberIds: number[]) => {
  const { data, error } = await supabaseAdmin.from('team_members').select().in('id', teamMemberIds)

  if (error) {
    throw error
  }

  return data
}
