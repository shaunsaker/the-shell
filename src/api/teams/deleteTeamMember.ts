import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const deleteTeamMember = async (id: number) => {
  const { data, error } = await supabase.functions.invoke('delete-team-member', {
    body: {
      id,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
