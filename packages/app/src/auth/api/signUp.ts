import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { auth, db } from '../../firebase'
import { User } from '../../types/firebase'
import { getISOString } from '../../utils/getISOString'

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string
  password: string
  firstName: string
  lastName: string
}) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  // create the user in the database
  const uid = userCredential.user.uid
  const user: User = {
    id: uid,
    createdAt: getISOString(),
    email,
    firstName,
    lastName,
  }

  await setDoc(doc(db, 'users', uid), user)
}
