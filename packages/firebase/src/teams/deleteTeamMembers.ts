import { firebase } from '../firebaseAdmin'

export const deleteTeamMember = async (teamMemberId: string) => {
  const teamMemberRef = firebase.firestore().collection('teamMembers').doc(teamMemberId)

  await teamMemberRef.delete()
}
