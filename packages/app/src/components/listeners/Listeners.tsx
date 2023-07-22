import { useAuthListener } from '../../hooks/auth/useAuthListener'
import { useSubscriptionListener } from '../../hooks/subscription/useSubscriptionListener'

export const Listeners = (): null => {
  useAuthListener()
  useSubscriptionListener()

  return null
}
