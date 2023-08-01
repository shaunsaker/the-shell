import { supabase } from '../../supabase'
import { handleApiError } from '../../utils/handleApiError'

export const fetchSubscriptionForUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select()
    .eq('user_id', userId)
    .in('status', ['trialing', 'active'])
    .maybeSingle()

  if (error) {
    await handleApiError(error)
  }

  return data
}
