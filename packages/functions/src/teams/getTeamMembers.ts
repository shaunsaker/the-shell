import { firebase } from '../firebaseAdmin'
import { TeamMember } from '../models'

export const getTeamMembers = async (teamId: string) => {
  const data = await firebase.firestore().collection('teams').doc(teamId).collection('members').get()

  return data.docs.map(doc => doc.data()) as TeamMember[]
}
