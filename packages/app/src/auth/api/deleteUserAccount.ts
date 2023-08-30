import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const deleteUserAccountFunction = invokeFunction(Functions.deleteUserAccount)

export const deleteUserAccount = async () => {
  const response = await deleteUserAccountFunction(undefined)

  return response
}
