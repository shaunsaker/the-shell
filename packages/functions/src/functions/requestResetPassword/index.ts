import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { generateResetPasswordLink } from '../../auth/generateResetPasswordLink'
import { getAuthUserByEmail } from '../../auth/getAuthUserByEmail'
import { sendResetPasswordEmail } from '../../emails/sendResetPasswordEmail'
import { Functions, FunctionsMap } from '../../models'
import { validateEmail } from '../../utils/validateEmail'

console.log('Hello from Request Reset Password!')

export const requestResetPasswordFunction = onCall<
  FunctionsMap[Functions.requestResetPassword]['data'],
  Promise<FunctionsMap[Functions.requestResetPassword]['response']>
>(async request => {
  try {
    const { siteUrl, email, newPassword, redirectUrl } = request.data

    // validate email
    if (!validateEmail(email)) {
      throw new HttpsError('invalid-argument', 'Invalid email')
    }

    const authUser = await getAuthUserByEmail(email)

    if (!authUser) {
      throw new HttpsError('not-found', 'User not found')
    }

    // create the email verification link
    const link = await generateResetPasswordLink({ email, newPassword, redirectUrl })

    // send the reset password email
    await sendResetPasswordEmail({
      siteUrl,
      email,
      link,
    })

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message, error)
  }
})
