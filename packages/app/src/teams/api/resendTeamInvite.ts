import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const resendTeamInviteFunction = invokeFunction(Functions.resendTeamInvite)

export const resendTeamInvite = async ({
  teamId,
  email,
  redirectTo,
}: {
  teamId: string
  email: string
  redirectTo: string
}) => {
  const response = await resendTeamInviteFunction({ teamId, email, redirectTo })

  return response
}
