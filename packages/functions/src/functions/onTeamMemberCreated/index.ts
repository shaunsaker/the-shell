import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { HttpsError } from 'firebase-functions/v2/https'
import { SubscriptionSeat, TeamMember } from 'types'

import { getSubscriptionSeats } from '../../billing/getSubscriptionSeats'
import { updateSubscriptionSeats } from '../../billing/updateSubscriptionSeats'

console.log('Hello from On Team Member Created!')

export const onTeamMemberCreated = onDocumentCreated('teams/{teamsId}/members/{uid}', async event => {
  const { uid } = event.params
  const teamMember = event.data?.data() as TeamMember | undefined

  if (!teamMember) {
    throw new HttpsError('not-found', 'Team member not found')
  }

  // when a user purchases a subscription they become the subcription owner and we automatically add a seat for them
  // when the subscription owner creates a team, we automatically add a team member, but in this case we don't need to add a seat since that was automatically created above
  const isSubscriptionOwner = teamMember.invitedBy === teamMember.userId

  if (isSubscriptionOwner) {
    return
  }

  // get the subscription seats for the admin that added this team member
  const invitersSubscriptionSeats = await getSubscriptionSeats(teamMember.invitedBy)

  // NOTE: this assumes that the user only has one subscription
  const subscriptionId = invitersSubscriptionSeats[0].subscriptionId

  // create a new subscription seat for the new team member
  const subscriptionSeat: SubscriptionSeat = {
    id: uid,
    subscriptionId,
    userId: teamMember.userId,
    email: teamMember.email,
    isSubscriptionOwner: false,
    createdAt: teamMember.createdAt,
  }

  await updateSubscriptionSeats([subscriptionSeat])
})
