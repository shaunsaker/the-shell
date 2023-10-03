import { ActionCodeSettings } from 'firebase-admin/auth'

import { firebase } from '../firebaseAdmin'

export const generateEmailVerificationLink = ({ email, redirectUrl }: { email: string; redirectUrl: string }) => {
  const actionCodeSettings: ActionCodeSettings = {
    url: redirectUrl,
  }

  return firebase.auth().generateEmailVerificationLink(email, actionCodeSettings)
}
