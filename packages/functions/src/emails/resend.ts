import { Resend } from 'resend'

export const resend = new Resend(
  process.env.RESEND_API_KEY ||
    // this is added so that Firebase functions static analysis doesn't complain
    '12345678',
)
