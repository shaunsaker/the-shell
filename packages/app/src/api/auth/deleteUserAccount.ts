import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const deleteUserAccount = async () => {
  const { data, error } = await supabase.functions.invoke('delete-user-account')

  if (error) {
    await handleApiError(error)
  }

  return data
}
