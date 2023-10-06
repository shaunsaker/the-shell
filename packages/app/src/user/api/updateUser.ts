import { doc, setDoc } from 'firebase/firestore'
import { Firestore, User } from 'types'

import { db } from '@/firebase'

export const updateUser = async (user: Partial<User> & { id: string }) => {
  const ref = doc(db, Firestore.Users, user.id)

  await setDoc(ref, user, { merge: true })
}
