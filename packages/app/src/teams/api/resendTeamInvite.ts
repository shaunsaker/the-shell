import { handleApiError } from '../../utils/handleApiError'
import { invokeFunction } from '../../utils/invokeFunction'

export const resendTeamInvite = async ({
  teamId,
  email,
  redirectTo,
}: {
  teamId: number
  email: string
  redirectTo: string
}) => {
  const { data, error } = await invokeFunction('resend-team-invite', {
    body: {
      teamId,
      email,
      redirectTo,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
