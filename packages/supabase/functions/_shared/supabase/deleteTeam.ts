import { deleteTeamMembersForTeam } from './deleteTeamMembersForTeam.ts'
import { supabaseAdmin } from './supabaseAdmin.ts'

export const deleteTeam = async (teamId: string) => {
  // First delete the team members
  await deleteTeamMembersForTeam(teamId)

  const { data, error } = await supabaseAdmin.from('teams').delete().eq('id', teamId)

  if (error) {
    throw error
  }

  return data
}
