import { User } from 'firebase/auth'

import { routes } from '../../routes'
import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const sendEmailVerificationFunction = invokeFunction(Functions.sendEmailVerification)

export const sendEmailVerification = async (user: User) => {
  if (!user.email) {
    throw new Error('No email found')
  }

  if (user.emailVerified) {
    return
  }

  await sendEmailVerificationFunction({
    email: user.email,
    redirectUrl: `${window.location.origin}${routes.userManagement}`,
    siteUrl: window.location.origin,
  })
}
