import { ANALYTICS_ENABLED, mixpanel } from './mixpanel'

export const trackAnalyticsEvent = (event: string, data: any) => {
  if (ANALYTICS_ENABLED) {
    mixpanel.track(event, data)
  }
}
