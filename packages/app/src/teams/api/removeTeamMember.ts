import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const removeTeamMemberFunction = invokeFunction(Functions.removeTeamMember)

export const removeTeamMember = async ({
  siteUrl,
  teamId,
  teamMemberId,
}: {
  siteUrl: string
  teamId: string
  teamMemberId: string
}) => {
  const response = await removeTeamMemberFunction({ siteUrl, teamId, teamMemberId })

  return response
}
