import { supabaseAdmin } from './supabaseAdmin.ts'

export const fetchUsersByEmails = async (emails: string[]) => {
  const { data, error } = await supabaseAdmin.from('users').select('*').in('email', emails)

  if (error) {
    throw error
  }

  return data
}