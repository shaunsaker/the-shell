import { render, screen } from '@testing-library/react'
import { Loading } from 'components'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useRestrictedSubscriptionRoute } from '@/billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '@/billing/hooks/useRestrictedTeamPlanRoute'
import { useRestrictedTeamAdminRoute } from '@/teams/hooks/useRestrictedTeamAdminRoute'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SettingsTeamMember } from '.'

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
  './components/changeTeamMemberRoleSection/ChangeTeamMemberRoleSection',
  vi.fn(() => ({
    ChangeTeamMemberRoleSection: () => <div />,
  })),
)

vi.mock(
  './components/removeTeamMemberSection/RemoveTeamMemberSection',
  vi.fn(() => ({
    RemoveTeamMemberSection: () => <div />,
  })),
)

const mocks = vi.hoisted(() => {
  return {
    useRestrictedSubscriptionRoute: vi.fn<any, Partial<ReturnType<typeof useRestrictedSubscriptionRoute>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useRestrictedTeamPlanRoute: vi.fn<any, Partial<ReturnType<typeof useRestrictedTeamPlanRoute>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useRestrictedTeamAdminRoute: vi.fn<any, Partial<ReturnType<typeof useRestrictedTeamAdminRoute>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
  }
})

vi.mock('@/billing/hooks/useRestrictedSubscriptionRoute', () => ({
  useRestrictedSubscriptionRoute: mocks.useRestrictedSubscriptionRoute,
}))

vi.mock('@/billing/hooks/useRestrictedTeamPlanRoute', () => ({
  useRestrictedTeamPlanRoute: mocks.useRestrictedTeamPlanRoute,
}))

vi.mock('@/teams/hooks/useRestrictedTeamAdminRoute', () => ({
  useRestrictedTeamAdminRoute: mocks.useRestrictedTeamAdminRoute,
}))

describe('SettingsTeamMember', () => {
  cleanUpAfterEach()

  it('renders the loading state', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValue({ data: true, isLoading: true })
    mocks.useRestrictedTeamPlanRoute.mockReturnValue({ data: true, isLoading: true })
    mocks.useRestrictedTeamAdminRoute.mockReturnValue({ data: true, isLoading: true })

    render(
      <MockAppProvider>
        <SettingsTeamMember />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(Loading.TestId)).toBeInTheDocument()
  })

  it('renders', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValue({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValue({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValue({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsTeamMember />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(MockTestIds.SettingsTeamsBreadcrumbs)).toBeInTheDocument()
  })

  it('restricts the route to users without an active subscription', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValue({ data: false, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValue({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValue({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsTeamMember />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId(MockTestIds.SettingsTeamsBreadcrumbs)).not.toBeInTheDocument()
  })

  it('restricts the route to users without a team plan', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValue({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValue({ data: false, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValue({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsTeamMember />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId(MockTestIds.SettingsTeamsBreadcrumbs)).not.toBeInTheDocument()
  })

  it('restricts the route to non-team admins', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValue({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValue({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValue({ data: false, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsTeamMember />
      </MockAppProvider>,
    )

    expect(screen.queryByTestId(MockTestIds.SettingsTeamsBreadcrumbs)).not.toBeInTheDocument()
  })
})
