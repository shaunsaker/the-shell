import { firebase } from '../firebaseAdmin'
import { deleteDocs } from '../utils/deleteDocs'

export const deleteTeamMembersForUser = async (userId: string) => {
  const docs = await firebase.firestore().collection('teamMembers').where('userId', '==', userId).get()

  await deleteDocs(docs)
}
