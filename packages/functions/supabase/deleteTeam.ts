import { deleteTeamMembersForTeam } from './deleteTeamMembersForTeam'
import { supabaseAdmin } from './supabaseAdmin'

export const deleteTeam = async (teamId: number) => {
  // First delete the team members
  await deleteTeamMembersForTeam(teamId)

  const { data, error } = await supabaseAdmin.from('teams').delete().eq('id', teamId)

  if (error) {
    throw error
  }

  return data
}
