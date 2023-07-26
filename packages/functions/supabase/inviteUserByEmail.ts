import { supabaseAdmin } from './supabaseAdmin'

export const inviteUserByEmail = async ({ email, redirectTo }: { email: string; redirectTo: string }) => {
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, { redirectTo })

  if (error) {
    throw error
  }

  return data
}
