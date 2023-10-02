import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useAuthUser } from '../../auth/hooks/useAuthUser'
import { makeAuthUser } from '../../auth/mocks/makeAuthUser'
import { cleanUpAfterEach } from '../../test/cleanUpAfterEach'
import { useIdentifyUser } from './useIdentifyUser'

const mocks = vi.hoisted(() => ({
  useAuthUser: vi.fn<any, Partial<ReturnType<typeof useAuthUser>>>(() => ({ data: undefined, isLoading: false })),
  identifyUser: vi.fn(),
}))

vi.mock('../../auth/hooks/useAuthUser', () => ({
  useAuthUser: mocks.useAuthUser,
}))

vi.mock('../api/identifyUser', () => ({
  identifyUser: mocks.identifyUser,
}))

describe('useIdentifyUser', () => {
  cleanUpAfterEach()

  it('does not call identifyUser when there is no user', () => {
    mocks.useAuthUser.mockReturnValueOnce({ data: undefined, isLoading: false })

    renderHook(useIdentifyUser)

    expect(mocks.identifyUser).not.toHaveBeenCalled()
  })

  it('calls identifyUser when the user changes', () => {
    const uid = '12345678'
    mocks.useAuthUser.mockReturnValueOnce({ data: makeAuthUser({ uid }), isLoading: false })

    renderHook(useIdentifyUser)

    expect(mocks.identifyUser).toHaveBeenCalledWith(uid)
  })
})
