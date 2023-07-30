import { sentry } from '.'

export const captureException = (exception: any) => {
  sentry.captureException(exception)
}
