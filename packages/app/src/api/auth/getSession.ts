import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    await handleApiError(error)
  }

  return session
}
