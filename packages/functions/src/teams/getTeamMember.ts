import { TeamMember } from 'types'

import { firebase } from '../firebaseAdmin'

export const getTeamMember = async ({ teamId, teamMemberId }: { teamId: string; teamMemberId: string }) => {
  const doc = await firebase.firestore().collection('teams').doc(teamId).collection('members').doc(teamMemberId).get()

  return doc.data() as TeamMember | undefined
}
