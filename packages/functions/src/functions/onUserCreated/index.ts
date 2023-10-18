import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { User } from 'types'

import { claimAssignedSeats } from './claimAssignedSeats'
import { claimGuestSubscriptions } from './claimGuestSubscriptions'

console.log('Hello from On User Created!')

export const onUserCreated = onDocumentCreated('users/{userId}', async event => {
  // if a new user was created, update all team members with the new user data
  const { userId } = event.params
  const data = event.data?.data() as User | undefined

  if (!data) {
    throw new Error('User not found')
  }

  if (!data.email) {
    throw new Error('User email not found')
  }

  await claimGuestSubscriptions({ uid: userId, email: data.email })

  await claimAssignedSeats({ uid: userId, email: data.email, firstName: data.firstName, lastName: data.lastName })
})
