import { useAuthListener } from '../../hooks/auth/useAuthListener'
import { useSubscriptionListener } from '../../hooks/subscriptions/useSubscriptionListener'

export const Listeners = (): null => {
  useAuthListener()
  useSubscriptionListener()

  return null
}
