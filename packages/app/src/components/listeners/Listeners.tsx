import { useIdentifyUser } from '../../analytics/hooks/useIdentifyUser'
import { useAuthListener } from '../../auth/hooks/useAuthListener'
import { useSubscriptionListener } from '../../billing/hooks/useSubscriptionListener'

export const Listeners = (): null => {
  useAuthListener()
  useSubscriptionListener()
  useIdentifyUser()

  return null
}
