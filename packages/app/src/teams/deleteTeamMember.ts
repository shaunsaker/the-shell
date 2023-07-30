import { supabase } from '../supabase'
import { handleApiError } from '../utils/handleApiError'

export const removeTeamMember = async (id: number) => {
  const { data, error } = await supabase.from('team_members').delete().eq('id', id)

  if (error) {
    await handleApiError(error)
  }

  return data
}