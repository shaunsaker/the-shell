import { supabaseAdmin } from './supabaseAdmin.ts'

export const deleteTeamMembersForTeam = async (teamId: string) => {
  const { data, error } = await supabaseAdmin.from('team_members').delete().eq('team_id', teamId)

  if (error) {
    throw error
  }

  return data
}