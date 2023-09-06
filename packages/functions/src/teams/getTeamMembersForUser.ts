import { firebase } from '../firebaseAdmin'
import { TeamMember } from '../models'

export const getTeamMembersForUser = async (userId: string) => {
  const docs = await firebase.firestore().collectionGroup('members').where('userId', '==', userId).get()

  return docs.docs.map(doc => doc.data()) as TeamMember[]
}
