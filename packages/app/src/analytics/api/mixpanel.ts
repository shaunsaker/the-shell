import mixpanel from 'mixpanel-browser'

if (import.meta.env.VITE_MIXPANEL_TOKEN) {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, { debug: true, track_pageview: true, persistence: 'localStorage' })
}

export const ANALYTICS_ENABLED = import.meta.env.VITE_MIXPANEL_TOKEN

export { mixpanel }
