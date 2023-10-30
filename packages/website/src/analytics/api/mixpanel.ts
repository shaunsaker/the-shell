import mixpanel from 'mixpanel-browser'

export const ANALYTICS_ENABLED = process.env.MODE !== 'development' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

const initMixpanel = () => {
  if (ANALYTICS_ENABLED) {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      track_pageview: true,
      persistence: 'localStorage',
    })
  }
}

export { initMixpanel, mixpanel }
