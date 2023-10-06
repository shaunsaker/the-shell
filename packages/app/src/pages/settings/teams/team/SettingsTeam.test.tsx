import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'
import { TestIds } from '@/types'

import { SettingsTeam } from '.'

enum MockTestIds {
  SettingsTeamsBreadcrumbs = 'settingsTeamsBreadcrumbs',
}

// mock the components so that we don't have to mock the entire firebase
vi.mock(
  '@/components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs',
  vi.fn(() => ({
    SettingsTeamsBreadcrumbs: () => <div data-testid={MockTestIds.SettingsTeamsBreadcrumbs} />,
  })),
)

vi.mock(
  './components/manageTeamMembersSection/ManageTeamMembersSection',
  vi.fn(() => ({
    ManageTeamMembersSection: () => <div />,
  })),
)

vi.mock(
  './components/changeTeamNameSection/ChangeTeamNameSection',
  vi.fn(() => ({
    ChangeTeamNameSection: () => <div />,
  })),
)

const mocks = vi.hoisted(() => {
  return {
    useRestrictedSubscriptionRoute: vi.fn(() => ({ data: false, isLoading: false })),
    useRestrictedTeamPlanRoute: vi.fn(() => ({ data: false, isLoading: false })),
  }
})

vi.mock('@/billing/hooks/useRestrictedSubscriptionRoute', () => ({
  useRestrictedSubscriptionRoute: mocks.useRestrictedSubscriptionRoute,
}))

vi.mock('@/billing/hooks/useRestrictedTeamPlanRoute', () => ({
  useRestrictedTeamPlanRoute: mocks.useRestrictedTeamPlanRoute,
}))

describe('SettingsTeam', () => {
  cleanUpAfterEach()

  it('renders the loading state', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: false, isLoading: true })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: false, isLoading: true })

    render(
      <MockAppProvider>
        <SettingsTeam />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(TestIds.Loading)).toBeInTheDocument()
  })

  it('restricts the route to users without a subscription', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: false, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsTeam />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId(TestIds.Loading)).not.toBeInTheDocument()
    expect(screen.queryByTestId(MockTestIds.SettingsTeamsBreadcrumbs)).not.toBeInTheDocument()
  })

  it('restricts the route to users without a team plan', () => {
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: false, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsTeam />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId(TestIds.Loading)).not.toBeInTheDocument()
    expect(screen.queryByTestId(MockTestIds.SettingsTeamsBreadcrumbs)).not.toBeInTheDocument()
  })

  it('does not restrict the route to users with a subscription and a team plan', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsTeam />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId(TestIds.Loading)).not.toBeInTheDocument()
    expect(screen.queryByTestId(MockTestIds.SettingsTeamsBreadcrumbs)).toBeInTheDocument()
  })
})
