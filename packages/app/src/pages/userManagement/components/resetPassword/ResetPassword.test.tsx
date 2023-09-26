import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '../../../../router/routes'
import { cleanUpAfterEach } from '../../../../test/cleanUpAfterEach'
import { MockAppProvider } from '../../../../test/MockAppProvider'
import { ResetPassword } from './ResetPassword'

const mocks = vi.hoisted(() => {
  return {
    navigate: vi.fn(),
    searchParams: vi.fn(
      () =>
        [
          {
            get: () => '',
          },
        ] as any,
    ),
    resetPassword: vi.fn(),
  }
})

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
    useSearchParams: mocks.searchParams,
  }
})

vi.mock('../../../../auth/hooks/useResetPassword', () => ({
  useResetPassword: vi.fn(() => ({
    mutate: mocks.resetPassword,
  })),
}))

describe('ResetPassword', () => {
  cleanUpAfterEach()

  it('renders and calls resetPassword with the actionCode and newPassword', async () => {
    mocks.searchParams.mockReturnValueOnce([
      {
        get: (param: string) => param,
      },
    ] as any)

    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    expect(screen.getByTestId('loading')).toBeInTheDocument()

    await waitFor(() =>
      expect(mocks.resetPassword).toHaveBeenCalledWith({
        actionCode: 'oobCode',
        newPassword: 'newPassword',
      }),
    )

    expect(mocks.navigate).toHaveBeenCalledWith(routes.signIn)
  })
})
