import { app } from 'config'
import { ChangeEmailVerification } from 'emails'

import { resend } from './resend'

export const sendChangeEmailVerificationEmail = async ({
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
    react: ChangeEmailVerification({ siteUrl, emailVerificationLink }),
  })

  return data
}
