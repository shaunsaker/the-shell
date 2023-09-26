import { sentry } from './sentry'

export const captureException = (exception: any) => {
  sentry.captureException(exception)
}
