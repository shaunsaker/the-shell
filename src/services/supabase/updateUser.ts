import { UserAttributes } from '@supabase/supabase-js'

import { supabase } from '.'

export const updateUser = async (user: UserAttributes) => {
  const { data, error } = await supabase.auth.updateUser(user)

  if (error) {
    throw error
  }

  return data
}
