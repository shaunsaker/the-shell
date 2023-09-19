import { Functions } from 'types'

import { routes } from '../../router/routes'
import { invokeFunction } from '../../utils/invokeFunction'

const sendChangeEmailVerificationFunction = invokeFunction(Functions.sendChangeEmailVerification)

export const sendChangeEmailVerification = async ({ oldEmail, newEmail }: { oldEmail: string; newEmail: string }) => {
  await sendChangeEmailVerificationFunction({
    oldEmail,
    newEmail,
    redirectUrl: `${window.location.origin}${routes.userManagement}`,
  })
}
