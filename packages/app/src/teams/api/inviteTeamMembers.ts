import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const inviteTeamMembersFunction = invokeFunction(Functions.inviteTeamMembers)

export const inviteTeamMembers = async ({
  siteUrl,
  teamId,
  emails,
}: {
  siteUrl: string
  teamId: string
  emails: string[]
}) => {
  const response = await inviteTeamMembersFunction({ siteUrl, teamId, emails })

  return response
}
