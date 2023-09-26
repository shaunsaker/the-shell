import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '../../test/cleanUpAfterEach'
import { MockAppProvider } from '../../test/MockAppProvider'
import { Dashboard } from '.'

const mocks = vi.hoisted(() => {
  const hasActiveSubscription = false

  return {
    useRestrictedSubscriptionRouteMock: vi.fn(() => ({ data: hasActiveSubscription, isLoading: true })),
  }
})

vi.mock('../../billing/hooks/useRestrictedSubscriptionRoute', () => ({
  useRestrictedSubscriptionRoute: mocks.useRestrictedSubscriptionRouteMock,
}))

describe('Dashboard', () => {
  cleanUpAfterEach()

  it('renders loading', () => {
    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>,
    )

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('does not render anything for users without an active subscription', () => {
    const hasActiveSubscription = false
    mocks.useRestrictedSubscriptionRouteMock.mockImplementationOnce(() => ({
      data: hasActiveSubscription,
      isLoading: false,
    }))

    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('renders the Dashboard for users with an active subscription', () => {
    const hasActiveSubscription = true
    mocks.useRestrictedSubscriptionRouteMock.mockImplementationOnce(() => ({
      data: hasActiveSubscription,
      isLoading: false,
    }))

    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
