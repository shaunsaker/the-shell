import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const deleteTeam = async (teamId: number) => {
  const { data, error } = await supabase.from('teams').delete().eq('id', teamId)

  if (error) {
    await handleApiError(error)
  }

  return data
}
