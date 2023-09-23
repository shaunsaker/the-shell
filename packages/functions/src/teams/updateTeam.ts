import { Firestore, Team } from 'types'

import { firebase } from '../firebaseAdmin'

export const updateTeam = async (team: Team) => {
  await firebase.firestore().collection(Firestore.Teams).doc(team.id).set(team, { merge: true })
}
