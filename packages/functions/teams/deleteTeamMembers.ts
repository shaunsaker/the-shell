import { supabaseAdmin } from '../supabaseAdmin'

export const deleteTeamMembers = async (teamMemberIds: number[]) => {
  const { data, error } = await supabaseAdmin.from('team_members').delete().in('id', teamMemberIds)

  if (error) {
    throw error
  }

  return data
}
