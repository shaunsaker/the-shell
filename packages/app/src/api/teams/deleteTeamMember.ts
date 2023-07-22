import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const deleteTeamMember = async (id: number) => {
  const { data, error } = await supabase.from('team_members').delete().eq('id', id)

  if (error) {
    await handleApiError(error)
  }

  return data
}
