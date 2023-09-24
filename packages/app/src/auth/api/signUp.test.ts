import { describe, expect, it } from 'vitest'

import { createUserWithEmailAndPasswordMock, firebaseAuthMock, MOCK_AUTH_USER } from '../../__mocks__/firebase'
import { updateUserMock } from '../../user/api/__mocks__/updateUser'
import { sendEmailVerificationMock } from './__mocks__/sendEmailVerification'
import { signOutMock } from './__mocks__/signOut'
import { signUp } from './signUp'

describe('signUp', () => {
  it('signs up a user', async () => {
    const firstName = 'firstName'
    const lastName = 'lastName'
    const email = 'email'
    const password = 'password'

    await signUp({
      firstName,
      lastName,
      email,
      password,
    })

    expect(signOutMock).toHaveBeenCalled()

    expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(firebaseAuthMock, email, password)

    expect(updateUserMock).toHaveBeenCalledWith({
      id: MOCK_AUTH_USER.uid,
      firstName,
      lastName,
      email,
    })

    expect(sendEmailVerificationMock).toHaveBeenCalledWith({ email })

    expect(signOutMock).toHaveBeenCalled()
  })
})
