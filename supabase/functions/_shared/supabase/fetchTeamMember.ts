import { supabaseAdmin } from './supabaseAdmin.ts'

export const fetchTeamMember = async (id: string) => {
  const { data, error } = await supabaseAdmin.from('team_members').select().eq('id', id).single()

  if (error) {
    throw error
  }

  return data
}
