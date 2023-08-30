import { collection, collectionGroup, getDocs, query, where } from 'firebase/firestore'

import { getAuthUser } from '../../auth/api/getAuthUser'
import { db } from '../../firebase'
import { Team } from '../../types/firebase'

export const getTeams = async () => {
  // first we need to fetch the user's team members
  const user = await getAuthUser()

  if (!user) {
    return []
  }

  const teamMembers = await getDocs(query(collectionGroup(db, 'members'), where('userId', '==', user.uid)))

  // then we need to fetch the teams
  const teams = await Promise.all(
    teamMembers.docs.map(async doc => {
      const teamId = doc.ref.parent.parent?.id

      if (teamId) {
        const team = await getDocs(collection(db, 'teams', teamId))

        return team.docs[0]
      }
    }),
  )

  return teams.map(team => ({
    id: team?.id,
    ...team?.data(),
  })) as Team[]
}
