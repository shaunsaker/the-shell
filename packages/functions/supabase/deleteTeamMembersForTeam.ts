import { supabaseAdmin } from './supabaseAdmin'

export const deleteTeamMembersForTeam = async (teamId: number) => {
  const { data, error } = await supabaseAdmin.from('team_members').delete().eq('team_id', teamId)

  if (error) {
    throw error
  }

  return data
}
