import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../firebase'

export const updateTeam = async ({ id, name }: { id: string; name: string }) => {
  await updateDoc(doc(db, 'teams', id), { name })
}
