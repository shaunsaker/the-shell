import { supabase } from '../supabase'
import { handleApiError } from '../utils/handleApiError'

export const signUp = async ({
  email,
  password,
  emailRedirectTo,
  firstName,
  lastName,
}: {
  email: string
  password: string
  emailRedirectTo?: string
  firstName?: string
  lastName?: string
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
