import { useCallback } from 'react'

export const useTrackAnalyticsEvent = () => {
  const trackAnalyticsEvent = useCallback((event: string, data: any) => {
    trackAnalyticsEvent(event, data)
  }, [])

  return trackAnalyticsEvent
}
