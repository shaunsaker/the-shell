import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, it, vi } from 'vitest'

import { MOCK_AUTH_USER } from '../../__mocks__/firebase'
import { useAuthUserMock } from '../../auth/hooks/__mocks__/useAuthUser'
import { identifyUserMock } from '../api/__mocks__/identifyUser'
import { useIdentifyUser } from './useIdentifyUser'

describe('useIdentifyUser', () => {
  it('should call identifyUser with authUser.uid when authUser changes', () => {
    const { rerender } = renderHook(() => useIdentifyUser())

    rerender()

    expect(identifyUserMock).toHaveBeenCalledWith(MOCK_AUTH_USER.uid)

    // change the auth user and make sure it calls identifyUser again
    const newUid = 'new-user'
    useAuthUserMock.mockImplementationOnce(() => ({ data: { uid: newUid } }))

    rerender()

    expect(identifyUserMock).toHaveBeenCalledWith(newUid)

    // Cleanup
    vi.clearAllMocks()
  })
})
