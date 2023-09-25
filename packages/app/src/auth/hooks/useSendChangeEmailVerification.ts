import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useUserEmail } from '../../user/hooks/useUserEmail'
import { sendChangeEmailVerification } from '../api/sendChangeEmailVerification'
import { useSignOut } from './useSignOut'

export const useSendChangeEmailVerification = () => {
  const { mutate: signOut } = useSignOut()
  const [_, setUserEmail] = useUserEmail()

  return useMutation({
    mutationFn: sendChangeEmailVerification,
    onSuccess: async (_, { newEmail }) => {
      // update the user's email in the app for quicker sign in
      setUserEmail(newEmail)

      await signOut()

      toast.success(
        `Your email has been changed. ${
          // email address verification and changing is currently not implemented in the emulator so we do it manually
          // https://github.com/firebase/firebase-tools/issues/3424
          import.meta.env.DEV
            ? 'Sign in with your new email to continue.'
            : 'Check your inbox for a verification email.'
        }`,
      )
    },
  })
}
