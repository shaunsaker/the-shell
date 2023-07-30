import { AddedToTeam } from 'emails'

import app from '../../common/app.json'
import { resend } from '.'

// FIXME: localhost port should come from config
const BASE_URL = process.env.CONTEXT !== 'dev' ? process.env.SITE_URL : 'http://localhost:5173'

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined')
}

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
    react: AddedToTeam({ userName, teamName, teamMemberName, url: BASE_URL }),
  })

  return data
}
