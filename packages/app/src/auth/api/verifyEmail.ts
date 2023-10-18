import { applyActionCode } from 'firebase/auth'

import { auth } from '@/firebase'

export const verifyEmail = async (actionCode: string | null) => {
  if (
    !actionCode &&
    // in development, we don't have an action code
    // because firebase automatically verifies the email when the email action link is clicked
    import.meta.env.MODE !== 'development'
  ) {
    throw new Error('Action code is missing')
  }

  if (actionCode) {
    // TODO: SS call the verify email function => but we don't have an actionCode in development so that function won't update the user in development
    await applyActionCode(auth, actionCode)
  }
}
