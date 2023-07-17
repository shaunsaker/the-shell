import { supabaseAdmin } from './supabaseAdmin.ts'

export const inviteUserByEmail = async (email: string) => {
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)

  if (error) {
    throw error
  }

  return data
}
