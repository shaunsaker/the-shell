import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../firebase'

export const updateTeam = async ({ id, name }: { id: string; name: string }) => {
  const ref = doc(db, 'teams', id)

  await updateDoc(ref, { name })
}
