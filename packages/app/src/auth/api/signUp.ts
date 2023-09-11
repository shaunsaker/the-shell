import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../firebase'
import { sendEmailVerification } from './sendEmailVerification'
import { signOut } from './signOut'

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string
  lastName: string
  email: string
  password: string
}) => {
  // sign out any existing user
  await signOut()

  await createUserWithEmailAndPassword(auth, email, password)

  await sendEmailVerification({ firstName, lastName, email })

  // the step above will sign in the user, so we need to sign them out again for our auth flow to work correctly
  await signOut()
}
