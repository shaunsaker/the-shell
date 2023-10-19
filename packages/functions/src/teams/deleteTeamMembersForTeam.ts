import { FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'
import { deleteDocs } from '@/utils/deleteDocs'

export const deleteTeamMembersForTeam = async (teamId: string) => {
  const docs = await firebase.firestore().collection(FirestoreCollection.Teams).doc(teamId).collection('members').get()

  await deleteDocs(docs)
}
