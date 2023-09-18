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
  const ref = collectionGroup(db, 'members')
  const queryRef = query(ref, where('userId', '==', authUser.uid), orderBy('createdAt', 'asc'))

  const teamMembers = await getDocs(queryRef)

  // then we need to fetch the teams
  const teams = await Promise.all(
    teamMembers.docs.map(async teamMemberDoc => {
      const teamId = teamMemberDoc.data().teamId

      if (teamId) {
        const teamRef = doc(db, 'teams', teamId)
        const teamDoc = await getDoc(teamRef)

        return teamDoc
      }
    }),
  )

  return teams.map(team => ({
    id: team?.id,
    ...team?.data(),
  })) as Team[]
}
