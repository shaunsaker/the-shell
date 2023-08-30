import { collection, getDocs } from 'firebase/firestore'

import { db } from '../../firebase'
import { TeamMember } from '../../types/firebase'

export const getTeamMembers = async (teamId: string) => {
  const teamMembers = await getDocs(collection(db, 'teams', teamId, 'members'))

  return teamMembers.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[]
}
