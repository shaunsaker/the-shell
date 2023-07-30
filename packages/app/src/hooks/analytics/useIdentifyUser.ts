import { useEffect } from 'react'

import { identifyUser } from '../../analytics/identifyUser'
import { useSession } from '../auth/useSession'

export const useIdentifyUser = () => {
  const { data: session } = useSession()

  useEffect(() => {
    // when the session changes, update the mixpanel user id
    if (session?.user.id) {
      identifyUser(session.user.id)
    }
  }, [session?.user.id])
}
