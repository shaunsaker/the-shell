import { deleteDoc, doc } from 'firebase/firestore'

import { db } from '../../firebase'

export const removeTeamMember = async ({ teamId, teamMemberId }: { teamId: string; teamMemberId: string }) => {
  await deleteDoc(doc(db, 'teams', teamId, 'members', teamMemberId))
}
