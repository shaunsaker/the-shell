import { firebase } from '@/firebase/admin'
import { deleteDocs } from '@/utils/deleteDocs'

export const deleteTeamMembersForUser = async (userId: string) => {
  const docs = await firebase.firestore().collectionGroup('members').where('userId', '==', userId).get()

  await deleteDocs(docs)
}
