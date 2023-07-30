import { RemovedFromTeam } from 'emails'

import app from '../../common/app.json'
import { resend } from '.'

export const sendRemovedFromTeamEmail = async ({
  userEmail,
  userName,
  teamName,
  teamMemberName,
}: {
  userEmail: string
  userName: string
  teamName: string
  teamMemberName: string
}) => {
  const data = await resend.emails.send({
    from: app.fromEmail,
    to: [userEmail],
    subject: `You've been removed from the ${teamName} team.`,
    react: RemovedFromTeam({ userName, teamName, teamMemberName }),
  })

  return data
}
