import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../firebase'

export const signInWithPassword = async ({ email, password }: { email: string; password: string }) => {
  await createUserWithEmailAndPassword(auth, email, password)
}
