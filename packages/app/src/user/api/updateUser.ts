import { doc, setDoc } from 'firebase/firestore'
import { User } from 'types'

import { db } from '../../firebase'

export const updateUser = async (user: Partial<User> & { id: string }) => {
  await setDoc(doc(db, 'users', user.id), user, { merge: true })
}
