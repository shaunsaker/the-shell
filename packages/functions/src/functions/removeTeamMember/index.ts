import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getAuthUser } from '../../auth/getAuthUser'
import { sendRemovedFromTeamEmail } from '../../emails/sendRemovedFromTeamEmail'
import { Functions, FunctionsMap } from '../../models'
import { deleteTeamMember } from '../../teams/deleteTeamMembers'
import { getTeam } from '../../teams/getTeam'
import { getTeamMembers } from '../../teams/getTeamMembers'
import { formatName } from '../../utils/formatName'

console.log('Hello from Remove Team Member!')

export const removeTeamMemberFunction = onCall<
  FunctionsMap[Functions.removeTeamMember]['data'],
  Promise<FunctionsMap[Functions.removeTeamMember]['response']>
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
    const { siteUrl, teamId, teamMemberId } = request.data

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

    const teamMember = teamMembers.find(teamMember => teamMember.id === teamMemberId)

    if (!teamMember) {
      throw new HttpsError('not-found', 'Team member not found')
    }

    await deleteTeamMember(teamMemberId)

    await sendRemovedFromTeamEmail({
      siteUrl,
      userEmail: teamMember.email || '',
      userName: formatName(teamMember),
      teamName: team.name,
      adminTeamMemberName: formatName(adminTeamMember),
    })

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message, error)
  }
})
