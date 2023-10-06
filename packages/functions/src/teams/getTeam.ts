import { Firestore, Team } from 'types'

import { firebase } from '@/firebase/admin'

export const getTeam = async (id: string) => {
  const doc = await firebase.firestore().collection(Firestore.Teams).doc(id).get()

  return doc.data() as Team | undefined
}
