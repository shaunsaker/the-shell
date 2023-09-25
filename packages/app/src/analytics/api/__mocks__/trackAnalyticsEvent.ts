import { vi } from 'vitest'

export const trackAnalyticsEventMock = vi.fn()

vi.mock('../trackAnalyticsEvent', () => ({ trackAnalyticsEvent: trackAnalyticsEventMock }))
