import { useEffect } from 'react'

import { useAuthUser } from '../../auth/hooks/useAuthUser'
import { identifyUser } from '../api/identifyUser'

export const useIdentifyUser = () => {
  const { data: user } = useAuthUser()

  useEffect(() => {
    // when the user changes, update the mixpanel user id
    if (user?.uid) {
      identifyUser(user.uid)
    }
  }, [user?.uid])
}
