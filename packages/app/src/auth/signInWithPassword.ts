import { supabase } from '../supabase'
import { handleApiError } from '../utils/handleApiError'

export const signInWithPassword = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
