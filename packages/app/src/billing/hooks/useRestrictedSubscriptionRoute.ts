import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../router/routes'
import { useSubscriptionSeats } from './useSubscriptionSeats'

export const useRestrictedSubscriptionRoute = () => {
  const navigate = useNavigate()
  const { data: subscriptionSeats, isLoading } = useSubscriptionSeats()

  // TODO: SS we also need to ensure the subscription is active => maybe we should use subscriptionInfo here instead
  const hasSubscription = subscriptionSeats?.length

  // only users with subscriptions can access restricted pages
  useEffect(() => {
    if (!isLoading && !hasSubscription) {
      navigate(routes.settingsSubscription)
    }
  }, [hasSubscription, navigate, isLoading])
}
