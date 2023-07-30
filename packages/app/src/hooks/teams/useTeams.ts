import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../models'
import { fetchTeams } from '../../teams/fetchTeams'

export const useTeams = () => {
  return useQuery({ queryKey: [QueryKeys.Teams], queryFn: fetchTeams })
}
