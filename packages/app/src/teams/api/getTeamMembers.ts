import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { TeamMember } from 'types'

import { db } from '../../firebase'

export const getTeamMembers = async (teamId: string) => {
  const ref = collection(db, 'teams', teamId, 'members')
  const queryRef = query(ref, orderBy('createdAt', 'asc'))

  const teamMembers = await getDocs(queryRef)

  return teamMembers.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[]
}
