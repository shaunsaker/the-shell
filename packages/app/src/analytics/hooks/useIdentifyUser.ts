import { useEffect } from 'react'

import { useSession } from '../../auth/hooks/useSession'
import { identifyUser } from '../api/identifyUser'

export const useIdentifyUser = () => {
  const { data: session } = useSession()

  useEffect(() => {
    // when the session changes, update the mixpanel user id
    if (session?.user.id) {
      identifyUser(session.user.id)
    }
  }, [session?.user.id])
}
