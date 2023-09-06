import { firebase } from '../firebaseAdmin'
import { deleteDocs } from '../utils/deleteDocs'

export const deleteTeamMembersForTeam = async (teamId: string) => {
  const docs = await firebase.firestore().collection('teams').doc(teamId).collection('members').get()

  await deleteDocs(docs)
}
