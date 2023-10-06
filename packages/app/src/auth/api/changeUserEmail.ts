import { Functions } from 'types'

import { invokeFunction } from '@/utils/invokeFunction'

const changeUserEmailFunction = invokeFunction(Functions.changeUserEmail)

export const changeUserEmail = async ({ oldEmail, newEmail }: { oldEmail: string; newEmail: string }) => {
  await changeUserEmailFunction({
    oldEmail,
    newEmail,
  })
}
