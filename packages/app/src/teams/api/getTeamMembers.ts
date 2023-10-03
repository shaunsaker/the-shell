import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { Firestore, TeamMember } from 'types'

import { db } from '../../firebase'

export const getTeamMembers = async (teamId: string) => {
  const ref = collection(db, Firestore.Teams, teamId, Firestore.TeamMembers)
  const queryRef = query(ref, orderBy('createdAt', 'asc'))

  const snapshot = await getDocs(queryRef)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[]
}
