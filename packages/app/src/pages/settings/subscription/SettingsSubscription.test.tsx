import { render, screen } from '@testing-library/react'
import { SubscriptionSeat } from 'types'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '../../../test/cleanUpAfterEach'
import { MockAppProvider } from '../../../test/MockAppProvider'
import { TestIds } from '../../../types'
import { SettingsSubscription } from '.'

enum MockedTestIds {
  ManagedSubscriptionSection = 'managedSubscriptionSection',
  Pricing = 'pricing',
  SubscriptionDetailsSection = 'subscriptionDetailsSection',
  SubscriptionSeatsSection = 'subscriptionSeatsSection',
}

vi.mock(
  './components/managedSubscriptionSection/ManagedSubscriptionSection',
  vi.fn(() => ({
    ManagedSubscriptionSection: () => <div data-testid={MockedTestIds.ManagedSubscriptionSection} />,
  })),
)

vi.mock(
  './components/pricing/Pricing',
  vi.fn(() => ({
    Pricing: () => <div data-testid={MockedTestIds.Pricing} />,
  })),
)

vi.mock(
  './components/subscriptionDetailsSection/SubscriptionDetailsSection',
  vi.fn(() => ({
    SubscriptionDetailsSection: () => <div data-testid={MockedTestIds.SubscriptionDetailsSection} />,
  })),
)

vi.mock(
  './components/subscriptionSeatsSection/SubscriptionSeatsSection',
  vi.fn(() => ({
    SubscriptionSeatsSection: () => <div data-testid={MockedTestIds.SubscriptionSeatsSection} />,
  })),
)

const mocks = vi.hoisted(() => {
  return {
    useIsFetching: vi.fn(() => false),
    useHasActiveSubscription: vi.fn(() => ({ data: false })),
    useSubscriptionSeats: vi.fn<any, { data: SubscriptionSeat[] }>(() => ({ data: [] })),
  }
})

vi.mock('@tanstack/react-query', async () => {
  const actual = (await vi.importActual('@tanstack/react-query')) as object

  return {
    ...actual,
    useIsFetching: mocks.useIsFetching,
  }
})

vi.mock('../../../billing/hooks/useHasActiveSubscription', () => ({
  useHasActiveSubscription: mocks.useHasActiveSubscription,
}))

vi.mock('../../../billing/hooks/useSubscriptionSeats', () => ({
  useSubscriptionSeats: mocks.useSubscriptionSeats,
}))

const makeSubscriptionSeat = ({ isSubscriptionOwner }: { isSubscriptionOwner: boolean }): SubscriptionSeat => ({
  isSubscriptionOwner,
  id: 'subscriptionSeatId',
  subscriptionId: 'subscriptionId',
  userId: 'userId',
  email: 'email',
  createdAt: '',
})

describe('SettingsSubscription', () => {
  cleanUpAfterEach()

  it('renders loading', () => {
    mocks.useIsFetching.mockReturnValueOnce(true)

    render(
      <MockAppProvider>
        <SettingsSubscription />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(TestIds.Loading)).toBeInTheDocument()
  })

  it('renders pricing for users without an active subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({ data: false })

    render(
      <MockAppProvider>
        <SettingsSubscription />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(MockedTestIds.Pricing)).toBeInTheDocument()
  })

  it('renders managed subscription section for users with a managed subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({ data: true })
    mocks.useSubscriptionSeats.mockReturnValueOnce({ data: [makeSubscriptionSeat({ isSubscriptionOwner: false })] })

    render(
      <MockAppProvider>
        <SettingsSubscription />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(MockedTestIds.ManagedSubscriptionSection)).toBeInTheDocument()
  })

  it('renders the subscription details for users with an owned subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({ data: true })
    mocks.useSubscriptionSeats.mockReturnValueOnce({ data: [makeSubscriptionSeat({ isSubscriptionOwner: true })] })

    render(
      <MockAppProvider>
        <SettingsSubscription />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(MockedTestIds.SubscriptionDetailsSection)).toBeInTheDocument()
    expect(screen.getByTestId(MockedTestIds.SubscriptionSeatsSection)).toBeInTheDocument()
  })
})
