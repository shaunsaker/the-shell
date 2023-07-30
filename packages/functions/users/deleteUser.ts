import { supabaseAdmin } from '../supabaseAdmin'

export const deleteUser = async (userId: string) => {
  const { data, error } = await supabaseAdmin.from('users').delete().eq('id', userId)

  if (error) {
    throw error
  }

  return data
}
