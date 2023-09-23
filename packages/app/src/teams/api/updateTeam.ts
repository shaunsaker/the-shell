import { doc, updateDoc } from 'firebase/firestore'
import { Firestore } from 'types'

import { db } from '../../firebase'

export const updateTeam = async ({ id, name }: { id: string; name: string }) => {
  const ref = doc(db, Firestore.Teams, id)

  await updateDoc(ref, { name })
}
