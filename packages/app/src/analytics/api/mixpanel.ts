import mixpanel from 'mixpanel-browser'

export const ANALYTICS_ENABLED = !import.meta.env.DEV && import.meta.env.VITE_MIXPANEL_TOKEN

if (ANALYTICS_ENABLED) {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
  })
}

export { mixpanel }
