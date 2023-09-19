import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../router/routes'
import { useSubscription } from './useSubscription'

export const useRestrictedSubscriptionRoute = () => {
  const navigate = useNavigate()
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription()

  const hasSubscription = subscription?.status === 'active'

  // only users with subscriptions can access restricted pages
  useEffect(() => {
    if (!subscriptionLoading && !hasSubscription) {
      navigate(routes.settingsSubscription)
    }
  }, [hasSubscription, navigate, subscriptionLoading])
}
