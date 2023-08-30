import { sendPasswordResetEmail } from 'firebase/auth'

import { auth } from '../../firebase'

export const resetPasswordForEmail = async ({ email, redirectTo }: { email: string; redirectTo: string }) => {
  await sendPasswordResetEmail(auth, email, { url: redirectTo })
}
