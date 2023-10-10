import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useRestrictedSubscriptionRoute } from '@/billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '@/billing/hooks/useRestrictedTeamPlanRoute'
import { routes } from '@/router/routes'
import { useRestrictedTeamAdminRoute } from '@/teams/hooks/useRestrictedTeamAdminRoute'
import { useTeam } from '@/teams/hooks/useTeam'
import { useTeamMember } from '@/teams/hooks/useTeamMember'
import { makeTeamMember } from '@/teams/mocks/makeTeamMember'
import { makeTeamWithMembers } from '@/teams/mocks/makeTeamWithMembers'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SettingsRemoveTeamMember } from '.'

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
    useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({ data: undefined, isLoading: false })),
    useTeamMember: vi.fn<any, Partial<ReturnType<typeof useTeamMember>>>(() => ({ data: undefined, isLoading: false })),
    removeTeamMember: vi.fn(),
    navigate: vi.fn(),
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

vi.mock('@/teams/hooks/useTeam', () => ({
  useTeam: mocks.useTeam,
}))

vi.mock('@/teams/hooks/useTeamMember', () => ({
  useTeamMember: mocks.useTeamMember,
}))

vi.mock('@/teams/hooks/useRemoveTeamMember', () => ({
  useRemoveTeamMember: () => ({
    mutate: mocks.removeTeamMember,
  }),
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

const getCancelButton = () => screen.getByRole('button', { name: 'Cancel' })
const getConfirmButton = () => screen.getByRole('button', { name: 'Confirm' })

describe('SettingsRemoveTeamMember', () => {
  cleanUpAfterEach()

  it('renders', async () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValueOnce({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    expect(screen.getByText('Remove team member')).toBeInTheDocument()
  })

  it('restricts the route to users without an active subscription', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: false, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValueOnce({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    expect(screen.queryByText('Remove team member')).not.toBeInTheDocument()
  })

  it('restricts the route to users without a team plan', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: false, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValueOnce({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    expect(screen.queryByText('Remove team member')).not.toBeInTheDocument()
  })

  it('restricts the route to non-team admins', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValueOnce({ data: false, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    expect(screen.queryByText('Remove team member')).not.toBeInTheDocument()
  })

  it('disables the confirm button when loading', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useTeam.mockReturnValueOnce({ data: makeTeamWithMembers({ team: {}, members: [] }), isLoading: true })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    expect(getConfirmButton()).toBeDisabled()
  })

  it('navigates back on cancel', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValueOnce({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    fireEvent.click(getCancelButton())

    expect(mocks.navigate).toHaveBeenCalledWith(routes.back)
  })

  it('removes a team member', () => {
    mocks.useRestrictedSubscriptionRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamPlanRoute.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useRestrictedTeamAdminRoute.mockReturnValueOnce({ data: true, isLoading: false })

    const teamId = '1'
    const teamMemberId = 'member-1'

    mocks.useTeamMember.mockReturnValueOnce({ data: makeTeamMember({ id: teamMemberId, teamId }), isLoading: false })
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: { id: teamId }, members: [{ id: teamMemberId, teamId }] }),
      isLoading: false,
    })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    fireEvent.click(getConfirmButton())

    expect(mocks.removeTeamMember).toHaveBeenCalledWith({
      teamId,
      teamMemberId,
    })
  })
})
