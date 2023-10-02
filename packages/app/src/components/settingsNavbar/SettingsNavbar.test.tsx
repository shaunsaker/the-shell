import { fireEvent, render, screen } from '@testing-library/react'
import { Team } from 'types'
import { describe, expect, it, vi } from 'vitest'

import { makeTeam } from '../../teams/mocks/makeTeam'
import { cleanUpAfterEach } from '../../test/cleanUpAfterEach'
import { MockAppProvider } from '../../test/MockAppProvider'
import { SettingsNavbar } from './SettingsNavbar'

const mocks = vi.hoisted(() => ({
  useHasActiveSubscription: vi.fn(() => ({ data: false, isLoading: true })),
  useHasTeamPlan: vi.fn(() => ({ data: false, isLoading: true })),
  useTeams: vi.fn<any, { data: Team[]; isLoading: boolean }>(() => ({ data: [], isLoading: true })),
  signOut: vi.fn(),
  navigate: vi.fn(),
}))

vi.mock('../../billing/hooks/useHasActiveSubscription', () => ({
  useHasActiveSubscription: mocks.useHasActiveSubscription,
}))

vi.mock('../../billing/hooks/useHasTeamPlan', () => ({
  useHasTeamPlan: mocks.useHasTeamPlan,
}))

vi.mock('../../teams/hooks/useTeams', () => ({
  useTeams: mocks.useTeams,
}))

vi.mock('../../auth/hooks/useSignOut', () => ({
  useSignOut: () => ({
    mutate: mocks.signOut,
  }),
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

describe('SettingsNavbar', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    expect(screen.getByRole('button', { name: 'Account' })).toBeInTheDocument()
  })

  it('signs a user out', () => {
    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }))

    expect(mocks.signOut).toHaveBeenCalled()
  })

  it('disables the subscription page if the active subscription is loading', () => {
    mocks.useHasActiveSubscription.mockReturnValue({ data: false, isLoading: true })

    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    expect(screen.getByRole('button', { name: 'Subscription' })).toBeDisabled()
  })

  it('disables the subscription page if user does not have an active subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValue({ data: false, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    expect(screen.getByRole('button', { name: 'Subscription' })).toBeDisabled()
  })

  it('enables the subscription page if user has an active subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValue({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    expect(screen.getByRole('button', { name: 'Subscription' })).toBeEnabled()
  })

  it('disables the teams page if the active subscription is loading or the team plan is loading or if there is no default team id', () => {
    mocks.useHasActiveSubscription.mockReturnValue({ data: true, isLoading: true })
    mocks.useHasTeamPlan.mockReturnValue({ data: false, isLoading: true })
    mocks.useTeams.mockReturnValue({ data: [], isLoading: true })

    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    expect(screen.getByRole('button', { name: 'Team' })).toBeDisabled()
  })

  it('disables the teams page if user does not have an active subscription and is not on the team plan', () => {
    mocks.useHasActiveSubscription.mockReturnValue({ data: false, isLoading: false })
    mocks.useHasTeamPlan.mockReturnValue({ data: false, isLoading: false })
    mocks.useTeams.mockReturnValue({ data: [], isLoading: false })

    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    expect(screen.getByRole('button', { name: 'Team' })).toBeDisabled()
  })

  it('enables the teams page if user has an active subscription and is on the team plan and has a default team id', () => {
    mocks.useHasActiveSubscription.mockReturnValue({ data: true, isLoading: false })
    mocks.useHasTeamPlan.mockReturnValue({ data: true, isLoading: false })
    mocks.useTeams.mockReturnValue({ data: [makeTeam({ id: 'team-1' })], isLoading: false })

    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    expect(screen.getByRole('button', { name: 'Team' })).toBeEnabled()
  })
})
