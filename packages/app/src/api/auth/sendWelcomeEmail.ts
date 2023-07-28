import { handleApiError } from '../utils/handleApiError'
import { invokeFunction } from '../utils/invokeFunction'

export const sendWelcomeEmail = async ({
  firstName,
  lastName,
  userEmail,
}: {
  firstName: string
  lastName: string
  userEmail: string
}) => {
  const { data, error } = await invokeFunction('send-welcome-email', {
    body: { firstName, lastName, userEmail },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
