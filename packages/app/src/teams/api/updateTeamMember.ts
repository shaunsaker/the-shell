import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../firebase'
import { TeamMemberRole } from '../../types/firebase'

export const updateTeamMember = async ({ id, role }: { id: string; role: TeamMemberRole }) => {
  await updateDoc(doc(db, 'members', id), { role })
}
