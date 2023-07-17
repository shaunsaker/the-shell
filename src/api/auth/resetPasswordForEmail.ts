import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const resetPasswordForEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    await handleApiError(error)
  }

  return data
}
