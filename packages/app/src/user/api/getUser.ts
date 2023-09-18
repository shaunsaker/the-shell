import { doc, getDoc } from 'firebase/firestore'
import { User } from 'types'

import { db } from '../../firebase'

export const getUser = async (uid: string) => {
  const ref = doc(db, 'users', uid)

  const user = await getDoc(ref)

  return (user.data() as User) || null
}
