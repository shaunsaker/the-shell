import { AddedToTeam } from 'emails'

import app from '../../../common/app.json'
import { resend } from './resend'

export const sendAddedUserToTeamEmail = async ({
  siteUrl,
  userEmail,
  userName,
  teamName,
  adminTeamMemberName,
}: {
  siteUrl: string
  userEmail: string
  userName: string
  teamName: string
  adminTeamMemberName: string
}) => {
  const data = await resend.emails.send({
    from: app.fromEmail,
    to: [userEmail],
    subject: `Welcome to the ${teamName} team!`,
    react: AddedToTeam({ siteUrl, userName, teamName, adminTeamMemberName }),
  })

  return data
}
