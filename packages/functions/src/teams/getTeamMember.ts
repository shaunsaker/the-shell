import { Firestore, TeamMember } from 'types'

import { firebase } from '../firebaseAdmin'

export const getTeamMember = async ({ teamId, teamMemberId }: { teamId: string; teamMemberId: string }) => {
  const doc = await firebase
    .firestore()
    .collection(Firestore.Teams)
    .doc(teamId)
    .collection(Firestore.TeamMembers)
    .doc(teamMemberId)
    .get()

  return doc.data() as TeamMember | undefined
}
