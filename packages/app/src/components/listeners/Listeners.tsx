import { useIdentifyUser } from '../../hooks/analytics/useIdentifyUser'
import { useAuthListener } from '../../hooks/auth/useAuthListener'
import { useSubscriptionListener } from '../../hooks/billing/useSubscriptionListener'

export const Listeners = (): null => {
  useAuthListener()
  useSubscriptionListener()
  useIdentifyUser()

  return null
}
