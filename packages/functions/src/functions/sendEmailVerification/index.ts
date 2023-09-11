import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { generateEmailVerificationLink } from '../../auth/generateEmailVerificationLink'
import { getAuthUserByEmail } from '../../auth/getAuthUserByEmail'
import { sendEmailVerificationEmail } from '../../emails/sendEmailVerificationEmail'
import { Functions, FunctionsMap } from '../../models'
import { updateUser } from '../../users/updateUser'
import { validateEmail } from '../../utils/validateEmail'

console.log('Hello from Send Email Verification!')

export const sendEmailVerificationFunction = onCall<
  FunctionsMap[Functions.sendEmailVerification]['data'],
  Promise<FunctionsMap[Functions.sendEmailVerification]['response']>
>(async request => {
  try {
    // Authorized api requests only
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Unauthorized')
    }

    const { firstName, lastName, email, redirectUrl, siteUrl } = request.data

    // validate email
    if (!validateEmail(email)) {
      throw new HttpsError('invalid-argument', 'Invalid email')
    }

    // check if the user and email exists (they may not be authenticated by this stage)
    const authUser = await getAuthUserByEmail(email)

    if (!authUser) {
      throw new HttpsError('not-found', 'User not found')
    }

    // create the email verification link
    const emailVerificationLink = await generateEmailVerificationLink({ email, redirectUrl })

    // send the verification email
    await sendEmailVerificationEmail({
      siteUrl,
      email,
      emailVerificationLink,
    })

    // save the user data
    const { uid } = authUser

    await updateUser(uid, {
      id: uid,
      firstName,
      lastName,
      email,
    })

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message, error)
  }
})
