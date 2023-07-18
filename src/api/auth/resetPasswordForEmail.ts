import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const resetPasswordForEmail = async ({ email, redirectTo }: { email: string; redirectTo: string }) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

  if (error) {
    await handleApiError(error)
  }

  return data
}
