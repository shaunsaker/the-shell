import { supabaseAdmin } from './supabaseAdmin'

export const fetchSubscriptionByUserId = async (userId: string) => {
  const { data, error } = await supabaseAdmin.from('subscriptions').select().eq('user_id', userId).single()

  if (error) {
    throw error
  }

  return data
}
