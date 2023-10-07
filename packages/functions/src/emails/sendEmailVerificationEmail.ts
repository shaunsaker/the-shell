import { VerificationEmail } from 'emails'

import app from '../../../config/app.json'
import { resend } from './resend'

export const sendEmailVerificationEmail = async ({
  siteUrl,
  email,
  emailVerificationLink,
}: {
  siteUrl: string
  email: string
  emailVerificationLink: string
}) => {
  const data = await resend.emails.send({
    from: app.fromEmail,
    to: [email],
    subject: `Verify your email for ${app.displayName}`,
    react: VerificationEmail({ siteUrl, emailVerificationLink }),
  })

  return data
}
