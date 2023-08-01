import { handleApiError } from '../../utils/handleApiError'
import { invokeFunction } from '../../utils/invokeFunction'

export const deleteTeam = async (teamId: number) => {
  const { data, error } = await invokeFunction('delete-team', {
    body: {
      teamId,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
