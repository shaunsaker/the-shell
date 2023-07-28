import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'
import { sendWelcomeEmail } from './sendWelcomeEmail'

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

  const { error: sendWelcomeEmailError } = await sendWelcomeEmail({
    firstName: data.user?.user_metadata.first_name || '',
    lastName: data.user?.user_metadata.last_name || '',
    userEmail: email,
  })

  if (sendWelcomeEmailError) {
    await handleApiError(sendWelcomeEmailError)
  }

  return data
}
