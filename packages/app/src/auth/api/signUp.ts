import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../firebase'
import { sendEmailVerification } from './sendEmailVerification'

export const signUp = async ({ email, password }: { email: string; password: string }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  await sendEmailVerification(userCredential.user)
}
