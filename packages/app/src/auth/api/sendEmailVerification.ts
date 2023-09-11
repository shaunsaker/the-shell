import { routes } from '../../routes'
import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const sendEmailVerificationFunction = invokeFunction(Functions.sendEmailVerification)

export const sendEmailVerification = async ({ email }: { email: string }) => {
  await sendEmailVerificationFunction({
    email,
    // we attach the mode manually because in development, Firebase does not attach it
    redirectUrl: `${window.location.origin}${routes.userManagement}?mode=verifyEmail`,
    siteUrl: window.location.origin,
  })
}
