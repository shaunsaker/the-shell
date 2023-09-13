import { ResetPassword } from 'emails'

import app from '../../../common/app.json'
import { resend } from './resend'

export const sendResetPasswordEmail = async ({
  siteUrl,
  email,
  link,
}: {
  siteUrl: string
  email: string
  link: string
}) => {
  const data = await resend.emails.send({
    from: app.fromEmail,
    to: [email],
    subject: `Reset your password for ${app.displayName}`,
    react: ResetPassword({ siteUrl, link }),
  })

  return data
}
