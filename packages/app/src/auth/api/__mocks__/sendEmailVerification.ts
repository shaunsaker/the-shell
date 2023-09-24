import { vi } from 'vitest'

export const sendEmailVerificationMock = vi.fn()

vi.mock('../sendEmailVerification', () => ({ sendEmailVerification: sendEmailVerificationMock }))
