import { onDocumentUpdated } from 'firebase-functions/v2/firestore'

import { firebase } from '../../firebaseAdmin'
import { User } from '../../models'

console.log('Hello from On Team Member User Data Updated!')

export const onTeamMemberUserDataUpdated = onDocumentUpdated('users/{userId}', async event => {
  const after = event.data?.after.data() as User | undefined
  const isUserDeleted = !after

  if (isUserDeleted) {
    return
  }

  const before = event.data?.before.data() as User | undefined

  if (!before) {
    throw new Error('User not found')
  }

  // if the user updated their firstName, lastName or email, update their team member data
  const isFirstNameUpdated = before.firstName !== after.firstName
  const isLastNameUpdated = before.lastName !== after.lastName
  const isEmailUpdated = before.email !== after.email

  if (isFirstNameUpdated || isLastNameUpdated || isEmailUpdated) {
    const members = await firebase.firestore().collectionGroup('members').where('userId', '==', after.id).get()

    members.forEach(async member => {
      await member.ref.update({
        firstName: after.firstName,
        lastName: after.lastName,
        email: after.email,
      })
    })
  }
})
