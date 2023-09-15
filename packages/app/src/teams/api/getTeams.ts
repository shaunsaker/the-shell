import { collectionGroup, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { Team } from 'types'

import { getAuthUser } from '../../auth/api/getAuthUser'
import { db } from '../../firebase'

export const getTeams = async () => {
  const authUser = await getAuthUser()

  if (!authUser) {
    return []
  }

  // first we need to fetch the user's team members
  const teamMembers = await getDocs(
    query(collectionGroup(db, 'members'), where('userId', '==', authUser.uid), orderBy('createdAt', 'asc')),
  )

  // then we need to fetch the teams
  const teams = await Promise.all(
    teamMembers.docs.map(async teamMemberDoc => {
      const teamId = teamMemberDoc.data().teamId

      if (teamId) {
        const teamDoc = await getDoc(doc(db, 'teams', teamId))

        return teamDoc
      }
    }),
  )

  return teams.map(team => ({
    id: team?.id,
    ...team?.data(),
  })) as Team[]
}
