import { supabase } from '..'

export const fetchSubscriptionForUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select()
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created', { ascending: false })

  if (error) {
    throw error
  }

  // return the latest subscription, if it exists
  return data
}
