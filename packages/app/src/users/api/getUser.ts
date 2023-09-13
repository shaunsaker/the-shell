import { doc, getDoc } from 'firebase/firestore'
import { User } from 'types'

import { db } from '../../firebase'

export const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, 'users', uid))

  return (user.data() as User) || null
}
