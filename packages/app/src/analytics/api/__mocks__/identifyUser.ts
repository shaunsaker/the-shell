import { vi } from 'vitest'

export const identifyUserMock = vi.fn()

vi.mock('../identifyUser', () => ({ identifyUser: identifyUserMock }))
