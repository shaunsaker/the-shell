import { AddedToTeam } from 'emails'

import app from '../../common/app.json'
import { resend } from '.'

// in development, the url is localhost, otherwise it's the deploy url
const IS_DEV = process.env.CONTEXT === 'dev'
// FIXME: this url should be in env
const URL = IS_DEV ? 'http://localhost:5173' : process.env.DEPLOY_PRIME_URL

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
    react: AddedToTeam({ userName, teamName, teamMemberName, url: URL }),
  })

  return data
}
