import { vi } from 'vitest'

import { MOCK_AUTH_USER } from '../../../__mocks__/firebase'

export const useAuthUserMock = vi.fn(() => ({ data: MOCK_AUTH_USER }))

vi.mock('../useAuthUser', () => ({ useAuthUser: useAuthUserMock }))
