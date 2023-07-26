import { handleApiError } from '../utils/handleApiError'
import { invokeFunction } from '../utils/invokeFunction'

export const deleteUserAccount = async () => {
  const { data, error } = await invokeFunction('delete-user-account')

  if (error) {
    await handleApiError(error)
  }

  return data
}
