import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { createTeam } from '../../api/teams/createTeam'
import { QueryKeys, Team } from '../../models'
import { routes } from '../../routes'

export const useCreateTeam = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: createTeam,
    onSuccess: (data: Team) => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team created successfully')

      router.push(routes.settingsEditTeam.replace(':teamId', data.id.toString()))
    },
  })
}
