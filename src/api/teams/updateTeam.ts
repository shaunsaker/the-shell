import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const updateTeam = async ({ id, name }: { id: number; name: string }) => {
  const { data, error } = await supabase.functions.invoke('update-team', {
    body: {
      id,
      name,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
