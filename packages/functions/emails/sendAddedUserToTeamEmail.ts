import { AddedToTeam } from 'emails'
import { getBaseUrl } from 'emails/utils/getBaseUrl'

import app from '../../common/app.json'
import { resend } from '.'

export const sendAddedUserToTeamEmail = async ({
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
    subject: `Welcome to the ${teamName} team!`,
    react: AddedToTeam({ userName, teamName, teamMemberName, url: getBaseUrl() }),
  })

  return data
}
