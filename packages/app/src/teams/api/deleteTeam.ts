import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const deleteTeamFunction = invokeFunction(Functions.deleteTeam)

export const deleteTeam = async ({ siteUrl, teamId }: { siteUrl: string; teamId: string }) => {
  const response = await deleteTeamFunction({ siteUrl, teamId })

  return response
}
