import { User } from 'types'

import { firebase } from '../firebaseAdmin'

export const getUsersByEmails = async (emails: string[]) => {
  const docs = await firebase.firestore().collection('users').where('email', 'in', emails).get()

  return docs.docs.map(doc => doc.data()) as User[]
}
