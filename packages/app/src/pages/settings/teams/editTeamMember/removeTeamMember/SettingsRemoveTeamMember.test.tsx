import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '../../../../../router/routes'
import { makeTeam } from '../../../../../teams/mocks/makeTeam'
import { makeTeamMember } from '../../../../../teams/mocks/makeTeamMember'
import { cleanUpAfterEach } from '../../../../../test/cleanUpAfterEach'
import { MockAppProvider } from '../../../../../test/MockAppProvider'
import { SettingsRemoveTeamMember } from '.'

const mocks = vi.hoisted(() => {
  return {
    useRestrictedSubscriptionRoute: vi.fn(),
    useRestrictedTeamPlanRoute: vi.fn(),
    useRestrictedTeamAdminRoute: vi.fn(),
    useTeam: vi.fn(() => ({ data: makeTeam({}), isLoading: false })),
    useTeamMember: vi.fn(() => ({ data: makeTeamMember({}), isLoading: false })),
    removeTeamMember: vi.fn(),
    navigate: vi.fn(),
  }
})

vi.mock('../../../../../billing/hooks/useRestrictedSubscriptionRoute', () => ({
  useRestrictedSubscriptionRoute: mocks.useRestrictedSubscriptionRoute,
}))

vi.mock('../../../../../billing/hooks/useRestrictedTeamPlanRoute', () => ({
  useRestrictedTeamPlanRoute: mocks.useRestrictedTeamPlanRoute,
}))

vi.mock('../../../../../teams/hooks/useRestrictedTeamAdminRoute', () => ({
  useRestrictedTeamAdminRoute: mocks.useRestrictedTeamAdminRoute,
}))

vi.mock('../../../../../teams/hooks/useTeam', () => ({
  useTeam: mocks.useTeam,
}))

vi.mock('../../../../../teams/hooks/useTeamMember', () => ({
  useTeamMember: mocks.useTeamMember,
}))

vi.mock('../../../../../teams/hooks/useRemoveTeamMember', () => ({
  useRemoveTeamMember: vi.fn(() => ({
    mutate: mocks.removeTeamMember,
  })),
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
    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    expect(screen.getByText('Remove team member')).toBeInTheDocument()
  })

  it('disables the confirm button when loading', () => {
    mocks.useTeam.mockReturnValueOnce({ data: makeTeam({}), isLoading: true })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    expect(getConfirmButton()).toBeDisabled()
  })

  it('navigates back on cancel', () => {
    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    fireEvent.click(getCancelButton())

    expect(mocks.navigate).toHaveBeenCalledWith(routes.back)
  })

  it('removes a team member', () => {
    const teamId = '1'
    const teamMemberId = 'member-1'

    mocks.useTeamMember.mockReturnValueOnce({ data: makeTeamMember({ id: teamMemberId, teamId }), isLoading: false })

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
