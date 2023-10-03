import { UpdateRequest } from 'firebase-admin/auth'

import { firebase } from '../firebaseAdmin'

export const updateAuthUser = async (uid: string, data: UpdateRequest) => {
  await firebase.auth().updateUser(uid, data)
}
