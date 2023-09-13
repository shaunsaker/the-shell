import { firebase } from '../firebaseAdmin'

export const deleteTeamMember = async ({ teamId, teamMemberId }: { teamId: string; teamMemberId: string }) => {
  await firebase.firestore().collection('teams').doc(teamId).collection('members').doc(teamMemberId).delete()
}
