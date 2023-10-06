import { useCallback } from 'react'

import { trackAnalyticsEvent } from '../api/trackAnalyticsEvent'

export const useTrackAnalyticsEvent = () => {
  const trackAnalyticsEventCb = useCallback((event: string, data: any) => {
    trackAnalyticsEvent(event, data)
  }, [])

  return trackAnalyticsEventCb
}
