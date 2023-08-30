import { firebase } from '../firebaseAdmin'
import { deleteDocs } from '../utils/deleteDocs'

export const deleteTeamMembersForTeam = async (teamId: string) => {
  const docs = await firebase.firestore().collection('docs').where('teamId', '==', teamId).get()

  await deleteDocs(docs)
}
