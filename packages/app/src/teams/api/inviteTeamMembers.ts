import { Functions } from 'types'

import { invokeFunction } from '../../utils/invokeFunction'

const inviteTeamMembersFunction = invokeFunction(Functions.inviteTeamMembers)

export const inviteTeamMembers = async ({ teamId, emails }: { teamId: string; emails: string[] }) => {
  const response = await inviteTeamMembersFunction({ teamId, emails })

  return response
}
