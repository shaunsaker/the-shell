import { useQuery } from '@tanstack/react-query'

import { fetchTeams } from '../../api/teams/fetchTeams'
import { QueryKeys } from '../../models'

export const useTeams = () => {
  return useQuery({ queryKey: [QueryKeys.Teams], queryFn: fetchTeams })
}
