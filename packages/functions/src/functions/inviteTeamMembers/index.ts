import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getAuthUser } from '../../auth/getAuthUser'
import { sendAddedUserToTeamEmail } from '../../emails/sendAddedUserToTeamEmail'
import { Functions, FunctionsMap, TeamMember, TeamMemberRole, TeamMemberStatus } from '../../models'
import { addTeamMembers } from '../../teams/addTeamMembers'
import { getTeam } from '../../teams/getTeam'
import { getTeamMembers } from '../../teams/getTeamMembers'
import { verifyTeamAdmin } from '../../teams/verifyTeamAdmin'
import { getUsersByEmails } from '../../users/getUsersByEmails'
import { formatName } from '../../utils/formatName'
import { getISOString } from '../../utils/getISOString'
import { getUuid } from '../../utils/getUuid'

console.log('Hello from Invite Team Members!')

export const inviteTeamMembersFunction = onCall<
  FunctionsMap[Functions.inviteTeamMembers]['data'],
  Promise<FunctionsMap[Functions.inviteTeamMembers]['response']>
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
    const { siteUrl, teamId, emails } = request.data

    const adminTeamMember = await verifyTeamAdmin({ teamId, uid: user.uid })

    const team = await getTeam(teamId)

    if (!team) {
      throw new HttpsError('not-found', 'Team not found')
    }

    const teamMembers = await getTeamMembers(teamId)

    // Filter out the emails that don't already belong to the team
    const newTeamMemberEmails = (emails as string[]).filter(
      email => !teamMembers.find(teamMember => teamMember.email === email),
    )

    // If any of the emails, have a user account, we send them an email saying they have been added to the team
    // otherwise, we send them an email with a link to sign up
    const existingUsers = await getUsersByEmails(newTeamMemberEmails)

    const newTeamMembers: TeamMember[] = newTeamMemberEmails.map(email => {
      const existingUser = existingUsers.find(existingUser => existingUser.email === email)
      const userId = existingUser?.id

      return {
        id: userId || getUuid(),
        createdAt: getISOString(),
        teamId: team.id,
        userId: userId || null, // this will be updated by a function when new users sign up
        role: TeamMemberRole.Member,
        status: existingUser ? TeamMemberStatus.Active : TeamMemberStatus.Invited,
        firstName: existingUser?.firstName || null,
        lastName: existingUser?.lastName || null,
        email,
      }
    })

    // Add all the team members to the team
    await addTeamMembers(teamId, newTeamMembers)

    // notify the users via email that they have been added to the team
    const promises = newTeamMembers.map(teamMember =>
      sendAddedUserToTeamEmail({
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
    console.error(error)
    throw new HttpsError('internal', (error as Error).message, error)
  }
})
