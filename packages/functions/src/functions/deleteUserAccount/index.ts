import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap } from 'types'

import { deleteAuthUser } from '../../auth/deleteAuthUser'
import { getAuthUser } from '../../auth/getAuthUser'
import { sendTeamDeletedEmail } from '../../emails/sendTeamDeletedEmail'
import { deleteTeam } from '../../teams/deleteTeam'
import { deleteTeamMembersForUser } from '../../teams/deleteTeamMembersForUser'
import { getTeam } from '../../teams/getTeam'
import { getTeamMembers } from '../../teams/getTeamMembers'
import { getTeamMembersForUser } from '../../teams/getTeamMembersForUser'
import { deleteUser } from '../../users/deleteUser'
import { formatName } from '../../utils/formatName'

console.log('Hello from Delete User Account!')

export const deleteUserAccountFunction = onCall<
  FunctionsMap[Functions.deleteUserAccount]['data'],
  Promise<FunctionsMap[Functions.deleteUserAccount]['response']>
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

    const userTeamMembers = await getTeamMembersForUser(user.uid)

    const { siteUrl } = request.data

    for (const userTember of userTeamMembers) {
      const teamId = userTember.teamId
      const teamMembers = await getTeamMembers(teamId)
      const teamAdmins = teamMembers.filter(teamMember => teamMember.role === 'admin' && teamMember.status === 'active')
      const isLastAdmin = teamAdmins.length === 1

      // if the user is the last admin, delete the team
      if (isLastAdmin) {
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
      }
    }

    // Remove the user from any other teams
    await deleteTeamMembersForUser(user.uid)

    // delete the user data
    await deleteUser(user.uid)

    // and the user account
    await deleteAuthUser(user.uid)

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message)
  }
})
