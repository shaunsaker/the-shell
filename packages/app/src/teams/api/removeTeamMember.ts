import { handleApiError } from '../../utils/handleApiError'
import { invokeFunction } from '../../utils/invokeFunction'

export const removeTeamMember = async ({ teamId, teamMemberId }: { teamId: number; teamMemberId: number }) => {
  const { data, error } = await invokeFunction('remove-team-member', {
    body: {
      teamId,
      teamMemberId,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
