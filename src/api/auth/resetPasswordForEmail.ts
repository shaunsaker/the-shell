import { supabase } from '..'

export const resetPasswordForEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    throw error
  }

  return data
}
