import { doc, setDoc } from 'firebase/firestore'

import { db } from '../../firebase'
import { User } from '../../types/firebase'

export const updateUser = async (user: Partial<User> & { id: string }) => {
  await setDoc(doc(db, 'users', user.id), user, { merge: true })
}
