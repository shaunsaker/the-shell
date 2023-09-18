import { doc, updateDoc } from 'firebase/firestore'
import { TeamMemberRole } from 'types'

import { db } from '../../firebase'

export const updateTeamMember = async ({
  teamId,
  teamMemberId,
  role,
}: {
  teamId: string
  teamMemberId: string
  role: TeamMemberRole
}) => {
  const ref = doc(db, 'teams', teamId, 'members', teamMemberId)

  await updateDoc(ref, { role })
}
