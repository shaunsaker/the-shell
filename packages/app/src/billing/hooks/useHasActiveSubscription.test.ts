import { renderHook } from '@testing-library/react'
import { SubscriptionStatus } from 'types'
import { describe, expect, it } from 'vitest'

import { useSubscriptionInfoMock } from './__mocks__/useSubscriptionInfo'
import { useHasActiveSubscription } from './useHasActiveSubscription'

describe('useHasActiveSubscription', () => {
  it('returns false when the user has a subscription with cancelled status', () => {
    useSubscriptionInfoMock.mockReturnValueOnce({
      data: {
        priceId: '',
        status: SubscriptionStatus.Cancelled,
      },
    })

    const { result } = renderHook(useHasActiveSubscription)

    expect(result.current.data).toBe(false)
  })

  it('returns true when the user has a subscription with active status', () => {
    useSubscriptionInfoMock.mockReturnValueOnce({
      data: {
        priceId: '',
        status: SubscriptionStatus.Active,
      },
    })

    const { result } = renderHook(useHasActiveSubscription)

    expect(result.current.data).toBe(true)
  })

  it('returns true when the user has a subscription with trial status', () => {
    useSubscriptionInfoMock.mockReturnValueOnce({
      data: {
        priceId: '',
        status: SubscriptionStatus.Trialing,
      },
    })

    const { result } = renderHook(useHasActiveSubscription)

    expect(result.current.data).toBe(true)
  })
})
