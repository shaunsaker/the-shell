import * as Sentry from '@sentry/react'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN
const ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENV

if (SENTRY_DSN && ENVIRONMENT) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
  })
}

export { Sentry as sentry }
