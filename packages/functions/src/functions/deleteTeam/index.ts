import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getAuthUser } from '../../auth/getAuthUser'
import { sendTeamDeletedEmail } from '../../emails/sendTeamDeletedEmail'
import { Functions, FunctionsMap } from '../../models'
import { deleteTeam } from '../../teams/deleteTeam'
import { deleteTeamMembersForTeam } from '../../teams/deleteTeamMembersForTeam'
import { getTeam } from '../../teams/getTeam'
import { getTeamMembers } from '../../teams/getTeamMembers'
import { verifyTeamAdmin } from '../../teams/verifyTeamAdmin'
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

    const adminTeamMember = await verifyTeamAdmin({ teamId, uid: user.uid })

    const teamMembers = await getTeamMembers(teamId)

    // Delete the team members
    await deleteTeamMembersForTeam(teamId)

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
