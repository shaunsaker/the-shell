import { collection, getDocs } from 'firebase/firestore'
import { TeamMember } from 'types'

import { db } from '../../firebase'

export const getTeamMembers = async (teamId: string) => {
  const teamMembers = await getDocs(collection(db, 'teams', teamId, 'members'))

  return teamMembers.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[]
}
