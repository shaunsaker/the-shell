import { useAuthListener } from '../../hooks/auth/useAuthListener'
import { useAuthRedirect } from '../../hooks/auth/useAuthRedirect'
import { useSubscriptionListener } from '../../hooks/subscription/useSubscriptionListener'

export const Listeners = (): null => {
  useAuthListener()
  useAuthRedirect()
  useSubscriptionListener()

  return null
}
