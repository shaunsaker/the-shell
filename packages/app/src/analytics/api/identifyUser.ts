import { ANALYTICS_ENABLED, mixpanel } from './mixpanel'

export const identifyUser = (uid: string) => {
  if (ANALYTICS_ENABLED) {
    mixpanel.identify(uid)
  }
}
