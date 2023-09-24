import { vi } from 'vitest'

export const signOutMock = vi.fn()

vi.mock('../signOut', () => ({ signOut: signOutMock }))
