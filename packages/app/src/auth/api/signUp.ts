import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { auth, db } from '../../firebase'

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string
  password: string
  firstName?: string
  lastName?: string
}) => {
  await createUserWithEmailAndPassword(auth, email, password)

  // create the user in the database
  await setDoc(doc(db, 'users'), {
    email,
    firstName,
    lastName,
  })
}
