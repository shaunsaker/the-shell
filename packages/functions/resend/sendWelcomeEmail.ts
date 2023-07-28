import { Welcome } from 'emails'

import app from '../../common/app.json'
import { resend } from '.'

// in development, the url is localhost, otherwise it's the deploy url
const IS_DEV = process.env.CONTEXT === 'dev'
// FIXME: this url should be in env
const URL = IS_DEV ? 'http://localhost:5173' : process.env.DEPLOY_PRIME_URL

export const sendWelcomeEmail = async ({ userName, userEmail }: { userName: string; userEmail: string }) => {
  const data = await resend.emails.send({
    from: app.fromEmail,
    to: [userEmail],
    subject: `Welcome to ${app.displayName}!`,
    react: Welcome({ userName, url: URL }),
  })

  return data
}
