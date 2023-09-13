import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../models'
import { getTeams } from '../../teams/api/getTeams'

export const useTeams = () => {
  return useQuery({ queryKey: [QueryKeys.Teams], queryFn: getTeams })
}
