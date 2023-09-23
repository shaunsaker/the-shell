import { doc, updateDoc } from 'firebase/firestore'
import { Firestore, TeamMemberRole } from 'types'

import { db } from '../../firebase'

export const updateTeamMemberRole = async ({
  teamId,
  teamMemberId,
  role,
}: {
  teamId: string
  teamMemberId: string
  role: TeamMemberRole
}) => {
  const ref = doc(db, Firestore.Teams, teamId, Firestore.TeamMembers, teamMemberId)

  await updateDoc(ref, { role })
}
