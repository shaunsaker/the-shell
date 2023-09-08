import { applyActionCode } from 'firebase/auth'

import { auth } from '../../firebase'

export const verifyEmail = async (actionCode: string) => {
  await applyActionCode(auth, actionCode)
}
