import * as Sentry from '@sentry/react'

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
const ENVIRONMENT = import.meta.env.VITE_SENTRY_ENV

if (SENTRY_DSN && ENVIRONMENT) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
  })
}

export { Sentry as sentry }
