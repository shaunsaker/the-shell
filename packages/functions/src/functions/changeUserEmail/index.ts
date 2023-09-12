import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getAuthUserByEmail } from '../../auth/getAuthUserByEmail'
import { sendEmailAddressChangedEmail } from '../../emails/sendEmailAddressChangedEmail'
import { Functions, FunctionsMap } from '../../models'
import { updateUser } from '../../users/updateUser'
import { validateEmail } from '../../utils/validateEmail'

console.log('Hello from Change User Email!')

export const changeUserEmailFunction = onCall<
  FunctionsMap[Functions.changeUserEmail]['data'],
  Promise<FunctionsMap[Functions.changeUserEmail]['response']>
>(async request => {
  try {
    const { oldEmail, newEmail, siteUrl } = request.data

    // validate the emails
    if (!validateEmail(oldEmail)) {
      throw new HttpsError('invalid-argument', 'Invalid oldEmail')
    }

    if (!validateEmail(newEmail)) {
      throw new HttpsError('invalid-argument', 'Invalid newEmail')
    }

    // check if the user and email exists (they may not be authenticated by this stage)
    const authUser = await getAuthUserByEmail(oldEmail)

    if (!authUser) {
      throw new HttpsError('not-found', 'User not found')
    }

    // update the user data with the new email
    await updateUser(authUser.uid, {
      email: newEmail,
    })

    // send them an email
    await sendEmailAddressChangedEmail({
      siteUrl,
      oldEmail,
      newEmail,
    })

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message, error)
  }
})
