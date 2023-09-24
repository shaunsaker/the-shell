import { User } from 'firebase/auth'
import { vi } from 'vitest'

export const firebaseAuthMock = {}

vi.mock('../firebase', () => ({
  app: {},
  auth: firebaseAuthMock,
  db: {},
  functions: {},
}))

export const MOCK_AUTH_USER: Partial<User> = {
  uid: 'mock-auth-user',
}

export const createUserWithEmailAndPasswordMock = vi.fn(() => ({
  user: MOCK_AUTH_USER,
}))

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: createUserWithEmailAndPasswordMock,
}))
