import { useEffect } from 'react'

import { useAuthUser } from '../../auth/hooks/useAuthUser'
import { identifyUser } from '../api/identifyUser'

export const useIdentifyUser = () => {
  const { data: authUser } = useAuthUser()

  useEffect(() => {
    // when the user changes, update the mixpanel user id
    if (authUser?.uid) {
      identifyUser(authUser.uid)
    }
  }, [authUser?.uid])
}
