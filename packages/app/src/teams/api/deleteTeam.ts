import { Functions } from 'types'

import { invokeFunction } from '../../utils/invokeFunction'

const deleteTeamFunction = invokeFunction(Functions.deleteTeam)

export const deleteTeam = async ({ teamId }: { teamId: string }) => {
  const response = await deleteTeamFunction({ teamId })

  return response
}
