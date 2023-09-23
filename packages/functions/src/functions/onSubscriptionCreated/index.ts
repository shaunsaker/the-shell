import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { Subscription, SubscriptionSeat, Team, TeamMember, TeamMemberRole, TeamMemberStatus } from 'types'

import { getProductByPriceId } from '../../billing/getProductByPriceId'
import { updateSubscriptionSeats } from '../../billing/updateSubscriptionSeats'
import { updateTeam } from '../../teams/updateTeam'
import { updateTeamMembers } from '../../teams/updateTeamMembers'
import { getUser } from '../../users/getUser'
import { getISOString } from '../../utils/getISOString'
import { getUuid } from '../../utils/getUuid'

console.log('Hello from On Subscription Created!')

export const onSubscriptionCreated = onDocumentCreated('subscriptions/{subscriptionId}', async event => {
  const subscription = event.data?.data() as Subscription
  const uid = subscription.ownerId

  const user = await getUser(uid)

  if (!user) {
    throw new Error(`No user found for uid [${uid}]`)
  }

  // create a subscription seat for the owner
  const subscriptionSeat: SubscriptionSeat = {
    id: uid,
    subscriptionId: subscription.id,
    userId: uid,
    email: user.email || '', // we should technically have the email by this stage but it's not a biggie if we don't
    isSubscriptionOwner: true, // this user is creating this subscription and is therefore the owner
    createdAt: getISOString(),
  }

  await updateSubscriptionSeats([subscriptionSeat])

  const product = await getProductByPriceId(subscription.priceId)

  if (!product) {
    throw new Error(`No product found for priceId [${subscription.priceId}]`)
  }

  // TODO: SS test this
  const isTeamPlan = Boolean(product.metadata?.teamPlan)

  if (!isTeamPlan) {
    return
  }

  // if the subscription is on the team plan, create a team and add the owner to the team
  const team: Team = {
    id: getUuid(),
    name: `${user.firstName} ${user.lastName}'s Team`,
    createdAt: getISOString(),
    ownerId: uid,
    subscriptionId: subscription.id,
  }

  await updateTeam(team)

  const teamMember: TeamMember = {
    id: uid,
    teamId: team.id,
    userId: uid,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: getISOString(),
    email: user.email || '', // we should technically have the email by this stage but it's not a biggie if we don't
    role: TeamMemberRole.Admin,
    status: TeamMemberStatus.Active,
    invitedBy: uid,
  }

  await updateTeamMembers([teamMember])
})