import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getAuthUser } from '../../auth/getAuthUser'
import { sendTeamDeletedEmail } from '../../emails/sendTeamDeletedEmail'
import { Functions, FunctionsMap } from '../../models'
import { deleteTeam } from '../../teams/deleteTeam'
import { getTeam } from '../../teams/getTeam'
import { getTeamMembers } from '../../teams/getTeamMembers'
import { formatName } from '../../utils/formatName'

console.log('Hello from Delete Team!')

export const deleteTeamFunction = onCall<
  FunctionsMap[Functions.deleteTeam]['data'],
  Promise<FunctionsMap[Functions.deleteTeam]['response']>
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
    const { siteUrl, teamId } = request.data

    const teamMembers = await getTeamMembers(teamId)

    // Verify that the logged in user is an admin of the team
    const adminTeamMember = teamMembers.find(teamMember => teamMember.userId === user.uid)

    if (!adminTeamMember || adminTeamMember.role !== 'admin') {
      throw new HttpsError('permission-denied', 'You need to be a team admin to remove team members.')
    }

    const team = await getTeam(teamId)

    if (!team) {
      throw new HttpsError('not-found', 'Team not found')
    }

    await deleteTeam(teamId)

    // notify team members that the team has been deleted
    const promises = teamMembers
      // notify everyone except the current user
      .filter(teamMember => teamMember.userId !== user.uid)
      .map(teamMember =>
        sendTeamDeletedEmail({
          siteUrl,
          userEmail: teamMember.email,
          userName: formatName(teamMember),
          teamName: team.name,
          adminTeamMemberName: formatName(adminTeamMember),
        }),
      )

    await Promise.all(promises)

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message)
  }
})
