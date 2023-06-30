import { supabase } from '.'

export const fetchSubscriptionForUser = async (userId: string) => {
  const response = await supabase
    .from('subscriptions')
    .select()
    .eq('user_id', userId)
    .order('created', { ascending: false })

  return response
}
