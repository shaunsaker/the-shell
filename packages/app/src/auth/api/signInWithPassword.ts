import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../firebase'

export const signInWithPassword = async ({ email, password }: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(auth, email, password)
}
