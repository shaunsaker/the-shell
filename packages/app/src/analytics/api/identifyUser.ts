import { ANALYTICS_ENABLED, mixpanel } from '.'

export const identifyUser = (uid: string) => {
  if (ANALYTICS_ENABLED) {
    mixpanel.identify(uid)
  }
}
