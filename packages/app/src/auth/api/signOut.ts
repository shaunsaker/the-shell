import { supabase } from '../../supabase'
import { handleApiError } from '../../utils/handleApiError'

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    await handleApiError(error)
  }
}
