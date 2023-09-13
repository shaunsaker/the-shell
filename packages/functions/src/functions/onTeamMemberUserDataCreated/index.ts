import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { TeamMemberStatus, User } from 'types'

import { firebase } from '../../firebaseAdmin'

console.log('Hello from On Team Member User Data Created!')

export const onTeamMemberUserDataCreated = onDocumentCreated('users/{userId}', async event => {
  // if a new user was created, update all team members with the new user data
  const data = event.data?.data() as User | undefined

  if (!data) {
    throw new Error('User not found')
  }

  if (!data.email) {
    throw new Error('User email not found')
  }

  const members = await firebase
    .firestore()
    .collectionGroup('members')
    .where('email', '==', data.email)
    .where('status', '==', TeamMemberStatus.Invited)
    .get()

  // the team member docs were created using a doc id but we need the doc id to be the new user id
  // therefore we delete the old member docs and create new ones with the new user id
  members.forEach(async member => {
    const teamId = member.ref.parent.parent?.id

    if (!teamId) {
      throw new Error('Team id not found')
    }

    await firebase
      .firestore()
      .collection('teams')
      .doc(teamId)
      .collection('members')
      .doc(data.id)
      .set({
        ...member.data(),
        userId: data.id,
        status: TeamMemberStatus.Active,
        firstName: data.firstName,
        lastName: data.lastName,
      })

    await member.ref.delete()
  })
})
