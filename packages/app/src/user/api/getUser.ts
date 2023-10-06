import { doc, getDoc } from 'firebase/firestore'
import { Firestore, User } from 'types'

import { db } from '@/firebase'

export const getUser = async (uid: string) => {
  const ref = doc(db, Firestore.Users, uid)

  const snapshot = await getDoc(ref)

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as User | undefined
}
