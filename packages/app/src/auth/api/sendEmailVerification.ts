import { ActionCodeSettings, sendEmailVerification as sendEmailVerificationCb, User } from 'firebase/auth'

import { routes } from '../../routes'

export const sendEmailVerification = async (user: User) => {
  const actionCodeSettings: ActionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `${window.location.origin}${routes.verifyEmail}`,
    // This must be true.
    handleCodeInApp: true,
  }

  await sendEmailVerificationCb(user, actionCodeSettings)
}
