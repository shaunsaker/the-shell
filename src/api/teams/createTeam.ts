import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const createTeam = async ({ name }: { name: string }) => {
  const { data, error } = await supabase.functions.invoke('create-team', {
    body: {
      name,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
