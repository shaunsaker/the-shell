import { doc, setDoc } from 'firebase/firestore'

import { getAuthUser } from '../../auth/api/getAuthUser'
import { db } from '../../firebase'
import { Team, TeamMember, TeamMemberRole, TeamMemberStatus } from '../../types/firebase'
import { getISOString } from '../../utils/getISOString'
import { getUuid } from '../../utils/getUuid'

export const createTeam = async ({
  name,
  userFirstName,
  userLastName,
  userEmail,
}: {
  name: string
  userFirstName: string
  userLastName: string
  userEmail: string
}) => {
  const authUser = await getAuthUser()

  if (!authUser) {
    throw new Error('User not found')
  }

  const uid = authUser.uid
  const now = getISOString()
  const teamId = getUuid()
  const team: Team = { id: teamId, name, ownerId: uid, createdAt: now }

  // create the team
  await setDoc(doc(db, 'teams', teamId), team)

  const teamMember: TeamMember = {
    id: uid,
    teamId,
    userId: uid,
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    createdAt: now,
    role: TeamMemberRole.Admin,
    status: TeamMemberStatus.Active,
  }

  // add the user as a team member
  await setDoc(doc(db, 'teams', teamId, 'members', uid), teamMember)

  return { teamId }
}
