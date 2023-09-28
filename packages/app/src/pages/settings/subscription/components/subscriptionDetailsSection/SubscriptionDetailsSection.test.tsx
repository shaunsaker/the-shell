import { fireEvent, render, screen } from '@testing-library/react'
import { Price, Product, Subscription, User } from 'types'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '../../../../../test/cleanUpAfterEach'
import { MockAppProvider } from '../../../../../test/MockAppProvider'
import { makeUser } from '../../../../../user/mocks/makeUser'
import { SubscriptionDetailsSection } from './SubscriptionDetailsSection'

const mocks = vi.hoisted(() => {
  return {
    useProducts: vi.fn<any, { data: Product[] }>(() => ({ data: [] })),
    usePrices: vi.fn<any, { data: Price[] }>(() => ({ data: [] })),
    useSubscriptions: vi.fn<any, { data: Subscription[] }>(() => ({ data: [] })),
    useUser: vi.fn<any, { data: User }>(() => ({ data: makeUser({}) })),
    useCreateBillingPortalSession: vi.fn(),
  }
})

vi.mock('../../../../../billing/hooks/useProducts', () => ({
  useProducts: mocks.useProducts,
}))

vi.mock('../../../../../billing/hooks/usePrices', () => ({
  usePrices: mocks.usePrices,
}))

vi.mock('../../../../../billing/hooks/useSubscriptionsListener', () => ({
  useSubscriptionsListener: vi.fn(),
}))

vi.mock('../../../../../billing/hooks/useSubscriptions', () => ({
  useSubscriptions: mocks.useSubscriptions,
}))

vi.mock('../../../../../user/hooks/useUser', () => ({
  useUser: mocks.useUser,
}))

vi.mock('../../../../../billing/hooks/useCreateBillingPortalSession', () => ({
  useCreateBillingPortalSession: () => ({
    mutate: mocks.useCreateBillingPortalSession,
  }),
}))

describe('SubscriptionDetailsSection', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <SubscriptionDetailsSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Subscription details')).toBeInTheDocument()
  })

  it('creates a billing portal session', () => {
    render(
      <MockAppProvider>
        <SubscriptionDetailsSection />
      </MockAppProvider>,
    )

    fireEvent.click(screen.getByText('Manage plan'))

    expect(mocks.useCreateBillingPortalSession).toHaveBeenCalledWith()
  })
})
