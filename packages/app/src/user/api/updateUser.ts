import { doc, setDoc } from 'firebase/firestore'
import { User } from 'types'

import { db } from '../../firebase'

export const updateUser = async (user: Partial<User> & { id: string }) => {
  const ref = doc(db, 'users', user.id)

  await setDoc(ref, user, { merge: true })
}
