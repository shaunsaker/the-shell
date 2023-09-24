import { User } from 'firebase/auth'
import { vi } from 'vitest'

export const MOCK_AUTH_USER: Partial<User> = {
  uid: 'mock-auth-user',
}

export const useAuthUserMock = vi.fn(() => ({ data: MOCK_AUTH_USER }))

vi.mock('../useAuthUser', () => ({ useAuthUser: useAuthUserMock }))
