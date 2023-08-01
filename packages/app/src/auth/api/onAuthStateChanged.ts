import { supabase } from '../../supabase'

export const onAuthStateChange = (cb: Parameters<typeof supabase.auth.onAuthStateChange>[0]) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(cb)

  return subscription
}
