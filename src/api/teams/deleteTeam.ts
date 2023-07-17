import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const deleteTeam = async (teamId: number) => {
  const { data, error } = await supabase.functions.invoke('delete-team', {
    body: {
      teamId,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
