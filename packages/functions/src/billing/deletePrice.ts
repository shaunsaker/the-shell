import { firebase } from '../firebaseAdmin'

export const deletePrice = async (id: string) => {
  await firebase.firestore().collection('prices').doc(id).delete()
}
