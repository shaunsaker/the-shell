import { TeamDeleted } from 'emails'

import app from '../../common/app.json'
import { resend } from '.'

export const sendTeamDeletedEmail = async ({
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
    subject: `The ${teamName} team has been deleted.`,
    react: TeamDeleted({ userName, teamName, teamMemberName }),
  })

  return data
}
