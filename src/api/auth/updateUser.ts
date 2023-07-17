import { UserAttributes } from '@supabase/supabase-js'

import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const updateUser = async (user: UserAttributes) => {
  const { data, error } = await supabase.auth.updateUser(user)

  if (error) {
    await handleApiError(error)
  }

  return data
}
