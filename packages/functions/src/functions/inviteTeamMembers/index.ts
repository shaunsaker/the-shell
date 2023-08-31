import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getAuthUser } from '../../auth/getAuthUser'
import { inviteUserByEmail } from '../../auth/inviteUserByEmail'
import { sendAddedUserToTeamEmail } from '../../emails/sendAddedUserToTeamEmail'
import { Functions, FunctionsMap, TeamMember, TeamMemberRole, TeamMemberStatus } from '../../models'
import { addTeamMembers } from '../../teams/addTeamMembers'
import { getTeam } from '../../teams/getTeam'
import { getTeamMembers } from '../../teams/getTeamMembers'
import { getUsersByEmails } from '../../users/getUsersByEmails'
import { formatName } from '../../utils/formatName'
import { getISOString } from '../../utils/getISOString'

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
    const { siteUrl, teamId, emails, redirectTo } = request.data

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

    // Filter out the emails that don't already belong to the team
    const uniqueEmails = (emails as string[]).filter(
      email => !teamMembers.find(teamMember => teamMember.email === email),
    )

    // If any of the emails, have a user account, we send them an email saying they have been added to the team
    // otherwise, we send them an email with a link to sign up
    const existingUsers = await getUsersByEmails(uniqueEmails)

    const teamMembersForExistingUsers: Omit<TeamMember, 'id'>[] = uniqueEmails.map(email => {
      const user = existingUsers.find(user => user.email === email)

      return {
        createdAt: getISOString(),
        teamId: team.id,
        userId: user?.id || null,
        role: TeamMemberRole.Member,
        status: TeamMemberStatus.Invited,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email,
      }
    })

    // Add all the team members to the team
    await addTeamMembers(teamMembersForExistingUsers)

    // notify the existingUsers above via email that they have been added to the team
    const inviteExistingUserPromises = existingUsers.map(user =>
      sendAddedUserToTeamEmail({
        siteUrl,
        userEmail: user.email,
        userName: formatName(user),
        teamName: team.name,
        adminTeamMemberName: formatName(adminTeamMember),
      }),
    )

    await Promise.all(inviteExistingUserPromises)

    // If the team members don't already have user accounts, we need to invite them to sign up
    const invitees = (uniqueEmails as string[]).filter(email => !existingUsers.find(user => user.email === email))

    for (const invitee of invitees) {
      await inviteUserByEmail({ email: invitee, redirectTo })
    }

    return {
      ok: true,
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message, error)
  }
})
