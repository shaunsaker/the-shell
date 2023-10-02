import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '../../test/cleanUpAfterEach'
import { MockAppProvider } from '../../test/MockAppProvider'
import { TestIds } from '../../types'
import { Dashboard } from '.'

const mocks = vi.hoisted(() => ({
  useRestrictedSubscriptionRoute: vi.fn(() => ({ data: false, isLoading: false })),
}))

vi.mock('../../billing/hooks/useRestrictedSubscriptionRoute', () => ({
  useRestrictedSubscriptionRoute: mocks.useRestrictedSubscriptionRoute,
}))

describe('Dashboard', () => {
  cleanUpAfterEach()

  it('renders loading', () => {
    mocks.useRestrictedSubscriptionRoute.mockImplementationOnce(() => ({
      data: false,
      isLoading: true,
    }))

    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(TestIds.Loading)).toBeInTheDocument()
  })

  it('does not render anything for users without an active subscription', () => {
    mocks.useRestrictedSubscriptionRoute.mockImplementationOnce(() => ({
      data: false,
      isLoading: false,
    }))

    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId(TestIds.Loading)).not.toBeInTheDocument()
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('renders the Dashboard for users with an active subscription', () => {
    const hasActiveSubscription = true
    mocks.useRestrictedSubscriptionRoute.mockImplementationOnce(() => ({
      data: hasActiveSubscription,
      isLoading: false,
    }))

    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId(TestIds.Loading)).not.toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
