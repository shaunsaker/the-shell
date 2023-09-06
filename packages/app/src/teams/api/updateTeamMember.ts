import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../firebase'
import { TeamMemberRole } from '../../types/firebase'

export const updateTeamMember = async ({
  teamId,
  teamMemberId,
  role,
}: {
  teamId: string
  teamMemberId: string
  role: TeamMemberRole
}) => {
  await updateDoc(doc(db, 'teams', teamId, 'members', teamMemberId), { role })
}
