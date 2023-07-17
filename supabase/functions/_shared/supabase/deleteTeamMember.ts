import { supabaseAdmin } from './supabaseAdmin.ts'

export const deleteTeamMember = async (id: string) => {
  const { data, error } = await supabaseAdmin.from('team_members').delete().eq('id', id)

  if (error) {
    throw error
  }

  return data
}
