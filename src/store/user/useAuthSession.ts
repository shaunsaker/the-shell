import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import { supabase } from '../../services/supabase'

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

      setLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return { session, loading }
}
