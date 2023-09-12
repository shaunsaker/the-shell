import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { generateVerifyAndChangeEmailLink } from '../../auth/generateVerifyAndChangeEmailLink'
import { getAuthUser } from '../../auth/getAuthUser'
import { updateAuthUser } from '../../auth/updateAuthUser'
import { sendEmailVerificationEmail } from '../../emails/sendEmailVerificationEmail'
import { Functions, FunctionsMap } from '../../models'
import { updateUser } from '../../users/updateUser'
import { validateEmail } from '../../utils/validateEmail'

console.log('Hello from Send Change Email Verification!')

export const sendChangeEmailVerificationFunction = onCall<
  FunctionsMap[Functions.sendChangeEmailVerification]['data'],
  Promise<FunctionsMap[Functions.sendChangeEmailVerification]['response']>
>(async request => {
  try {
    // Authorized api requests only
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Unauthorized')
    }

    const { oldEmail, newEmail, redirectUrl, siteUrl } = request.data

    // validate oldEmail
    if (!validateEmail(oldEmail)) {
      throw new HttpsError('invalid-argument', 'Invalid oldEmail')
    }

    // validate newEmail
    if (!validateEmail(newEmail)) {
      throw new HttpsError('invalid-argument', 'Invalid newEmail')
    }

    const authUser = await getAuthUser(request.auth.uid)

    if (!authUser) {
      throw new HttpsError('not-found', 'User not found')
    }

    if (process.env.FUNCTIONS_EMULATOR) {
      // email address verification and changing is currently not implemented in the emulator so we do it manually
      // https://github.com/firebase/firebase-tools/issues/3424
      await updateAuthUser(authUser.uid, {
        email: newEmail,
        emailVerified: true,
      })

      // update the user data with the new email
      await updateUser(authUser.uid, {
        email: newEmail,
      })
    } else {
      // create the email verification link
      const emailVerificationLink = await generateVerifyAndChangeEmailLink({ oldEmail, newEmail, redirectUrl })

      // send the verification email
      await sendEmailVerificationEmail({
        siteUrl,
        email: newEmail,
        emailVerificationLink,
      })
    }

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message, error)
  }
})
