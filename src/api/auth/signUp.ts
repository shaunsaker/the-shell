import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const signUp = async (args: Parameters<typeof supabase.auth.signUp>[0]) => {
  const { data, error } = await supabase.auth.signUp(args)

  if (error) {
    await handleApiError(error)
  }

  return data
}
