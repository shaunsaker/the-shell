import { supabase } from '../../supabase'
import { handleApiError } from '../../utils/handleApiError'

export const updateTeam = async ({ id, name }: { id: number; name: string }) => {
  const { data, error } = await supabase.from('teams').update({ name }).eq('id', id)

  if (error) {
    await handleApiError(error)
  }

  return data
}
