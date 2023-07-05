import { supabase } from '..'

export const fetchUser = async (userId: string) => {
  const { data, error } = await supabase.from('users').select().eq('id', userId).single()

  if (error) {
    throw error
  }

  return data
}
