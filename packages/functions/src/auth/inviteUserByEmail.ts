import { firebase } from '../firebaseAdmin'

export const inviteUserByEmail = async ({ email, redirectTo }: { email: string; redirectTo: string }) => {
  await firebase.auth().generateEmailVerificationLink(email, {
    url: redirectTo,
    handleCodeInApp: true,
  })
}
