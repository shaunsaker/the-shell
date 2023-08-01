import { supabase } from '../../supabase'
import { handleApiError } from '../../utils/handleApiError'

export const fetchUser = async (userId: string) => {
  const { data, error } = await supabase.from('users').select().eq('id', userId).single()

  if (error) {
    await handleApiError(error)
  }

  return data
}
