import { firebase } from '../firebaseAdmin'
import { Team } from '../models'

export const getTeam = async (id: string) => {
  const doc = await firebase.firestore().collection('teams').doc(id).get()

  return doc.data() as Team | undefined
}
