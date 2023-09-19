import { Functions } from 'types'

import { routes } from '../../router/routes'
import { invokeFunction } from '../../utils/invokeFunction'

const sendEmailVerificationFunction = invokeFunction(Functions.sendEmailVerification)

export const sendEmailVerification = async ({ email }: { email: string }) => {
  await sendEmailVerificationFunction({
    email,
    redirectUrl: `${window.location.origin}${routes.userManagement}?mode=verifyEmail`,
  })
}
