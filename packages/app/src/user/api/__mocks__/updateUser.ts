import { vi } from 'vitest'

export const updateUserMock = vi.fn()

vi.mock('../updateUser', () => ({ updateUser: updateUserMock }))
