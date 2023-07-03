import { supabase } from '..'

export const deleteUserAccount = async () => {
  const { data, error } = await supabase.rpc('delete_user')

  if (error) {
    throw error
  }

  return data
}
