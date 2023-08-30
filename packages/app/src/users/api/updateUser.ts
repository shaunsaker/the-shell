import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../firebase'
import { User } from '../../types/firebase'

export const updateUser = async (user: Partial<User> & { id: string }) => {
  await updateDoc(doc(db, 'users', user.id), user)
}
