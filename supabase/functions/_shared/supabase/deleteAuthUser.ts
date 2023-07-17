import { supabaseAdmin } from './supabaseAdmin.ts'

export const deleteAuthUser = async (userId: string) => {
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId)

  if (error) {
    throw error
  }

  return data
}
