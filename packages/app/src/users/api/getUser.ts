import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../firebase'
import { User } from '../../types/firebase'

export const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, 'users', uid))

  return user.data() as User | undefined
}
