import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getAuthUser } from '../../auth/getAuthUser'
import { inviteUserByEmail } from '../../auth/inviteUserByEmail'
import { Functions, FunctionsMap } from '../../models'
import { getTeam } from '../../teams/getTeam'
import { getTeamMembers } from '../../teams/getTeamMembers'

console.log('Hello from Resend Team Member Invite!')

export const resendTeamInviteFunction = onCall<
  FunctionsMap[Functions.resendTeamInvite]['data'],
  Promise<FunctionsMap[Functions.resendTeamInvite]['response']>
>(async request => {
  try {
    // Authorized api requests only
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Unauthorized')
    }

    // Get the user from the request
    const user = await getAuthUser(request.auth.uid)

    if (!user) {
      throw new HttpsError('not-found', 'User not found')
    }

    // Destructure the data from the POST body
    const { teamId, email, redirectTo } = request.data

    const team = await getTeam(teamId)

    if (!team) {
      throw new HttpsError('not-found', 'Team not found')
    }

    const teamMembers = await getTeamMembers(teamId)

    // Verify that the logged in user is an admin of the team
    const adminTeamMember = teamMembers.find(teamMember => teamMember.userId === user.uid)

    if (!adminTeamMember || adminTeamMember.role !== 'admin') {
      throw new HttpsError('permission-denied', 'You need to be a team admin to invite team members.')
    }

    await inviteUserByEmail({ email, redirectTo })

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message, error)
  }
})
