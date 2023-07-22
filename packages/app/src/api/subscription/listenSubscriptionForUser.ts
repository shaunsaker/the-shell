import { Subscription } from '../../models'
import { supabase } from '..'

export const listenSubscriptionForUser = (userId: string, cb: (data: Subscription) => void) => {
  return supabase
    .channel('any')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'subscriptions',
        filter: `user_id=eq.${userId}`,
      },
      payload => cb(payload.new as Subscription),
    )
    .subscribe()
}
