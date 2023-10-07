import { RemovedFromTeam } from 'emails'

import app from '../../../config/app.json'
import { resend } from './resend'

export const sendRemovedFromTeamEmail = async ({
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
    subject: `You've been removed from the ${teamName} team.`,
    react: RemovedFromTeam({ siteUrl, userName, teamName, adminTeamMemberName }),
  })

  return data
}
