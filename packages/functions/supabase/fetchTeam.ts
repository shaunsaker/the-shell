import { supabaseAdmin } from './supabaseAdmin'

export const fetchTeam = async (id: number) => {
  const { data, error } = await supabaseAdmin.from('teams').select(`*, team_members (*)`).eq('id', id).single()

  if (error) {
    throw error
  }

  return data
}
