import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../router/routes'
import { useSubscriptionSeats } from './useSubscriptionSeats'

export const useRestrictedSubscriptionRoute = () => {
  const { data: hasActiveSubscription, isLoading } = useSubscriptionSeats()
  const navigate = useNavigate()

  // only users with active subscriptions can access restricted pages
  useEffect(() => {
    if (!isLoading && !hasActiveSubscription) {
      navigate(routes.settingsSubscription)
    }
  }, [hasActiveSubscription, navigate, isLoading])
}
