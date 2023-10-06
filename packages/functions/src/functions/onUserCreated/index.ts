import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { TeamMemberStatus, User } from 'types'

import { deleteSubscriptionSeats } from '@/billing/deleteSubscriptionSeats'
import { getUnclaimedSubscriptionSeats } from '@/billing/getUnclaimedSubscriptionSeats'
import { updateSubscriptionSeats } from '@/billing/updateSubscriptionSeats'
import { deleteTeamMembers } from '@/teams/deleteTeamMembers'
import { getUnclaimedTeamMembers } from '@/teams/getUnclaimedTeamMembers'
import { updateTeamMembers } from '@/teams/updateTeamMembers'

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

  // claim any subscription seats where the userId is null and the email matches the new user email
  const subscriptionSeats = await getUnclaimedSubscriptionSeats(data.email)

  // the subscription seat docs were created using a doc id but we need the doc id to be the new user id
  // therefore we delete the old subscription seat docs and create new ones with the new user id
  const updatedSubscriptionSeats = subscriptionSeats.map(seat => ({
    ...seat,
    id: userId,
    userId,
  }))

  await updateSubscriptionSeats(updatedSubscriptionSeats)

  await deleteSubscriptionSeats(subscriptionSeats)

  // claim any team members where the userId is null and the email matches the new user email
  const teamMembers = await getUnclaimedTeamMembers(data.email)

  // the team member docs were created using a doc id but we need the doc id to be the new user id
  // therefore we delete the old member docs and create new ones with the new user id
  const updatedTeamMembers = teamMembers.map(member => ({
    ...member,
    id: userId,
    userId,
    status: TeamMemberStatus.Active,
    firstName: data.firstName,
    lastName: data.lastName,
  }))

  await updateTeamMembers(updatedTeamMembers)

  await deleteTeamMembers(teamMembers)
})
