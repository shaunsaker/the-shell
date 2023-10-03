import { Firestore } from 'types'

import { firebase } from '../firebaseAdmin'
import { deleteTeamMembersForTeam } from './deleteTeamMembersForTeam'

export const deleteTeam = async (teamId: string) => {
  // First delete the team members
  await deleteTeamMembersForTeam(teamId)

  // Then delete the team
  await firebase.firestore().collection(Firestore.Teams).doc(teamId.toString()).delete()
}
