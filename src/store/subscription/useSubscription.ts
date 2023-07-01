import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect, useState } from 'react'

import { fetchSubscriptionForUser } from '../../services/supabase/fetchSubscriptionForUser'
import { Database } from '../../typings/db'
import { useSession } from '../user/useSession'

type Subscription = Database['public']['Tables']['subscriptions']['Row']

const atom = atomWithStorage<Subscription | null>('subscription', null)

const useSubscriptionAtom = () => useAtom(atom)

export const useSubscription = () => {
  const [subscription, setSubscription] = useSubscriptionAtom()
  const { session } = useSession()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) {
      setLoading(true)

      fetchSubscriptionForUser(session.user.id).then(({ data }) => {
        // don't handle the error, it's possible that there is no subscription for the user

        // the user may have multiple subscriptions, some of which were cancelled
        // for our purposes we only need the latest active subscription
        const activeSubscription = data?.find(subscription => subscription.status === 'active')

        if (activeSubscription) {
          setSubscription(activeSubscription)
        } else {
          setSubscription(null)
        }

        setLoading(false)
      })
    }
  }, [session, setSubscription])

  return { subscription, loading }
}
