import { supabase } from '.'

export const signUp = async (args: Parameters<typeof supabase.auth.signUp>[0]) => {
  const { data, error } = await supabase.auth.signUp(args)

  if (error) {
    throw error
  }

  return data
}
