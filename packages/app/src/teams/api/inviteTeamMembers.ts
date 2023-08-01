import { handleApiError } from '../../utils/handleApiError'
import { invokeFunction } from '../../utils/invokeFunction'

export const inviteTeamMembers = async ({
  teamId,
  emails,
  redirectTo,
}: {
  teamId: string
  emails: string[]
  redirectTo: string
}) => {
  const { data, error } = await invokeFunction('invite-team-members', {
    body: {
      teamId,
      emails,
      redirectTo,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
