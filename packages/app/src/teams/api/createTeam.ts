import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

import { db } from '../../firebase'
import { Team, TeamMember, TeamMemberRole, TeamMemberStatus } from '../../types/firebase'
import { getISOString } from '../../utils/getISOString'

export const createTeam = async ({
  name,
  uid,
  userFirstName,
  userLastName,
  userEmail,
}: {
  name: string
  uid: string
  userFirstName: string
  userLastName: string
  userEmail: string
}) => {
  const now = getISOString()
  const team: Omit<Team, 'id'> = { name, ownerId: uid, createdAt: now }

  // create the team
  const teamRef = await addDoc(collection(db, 'teams'), team)

  const teamId = teamRef.id
  const teamMember: Omit<TeamMember, 'id'> = {
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

  return teamRef
}
