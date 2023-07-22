import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateTeamMember } from '../../api/teams/updateTeamMember'
import { QueryKeys } from '../../models'

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTeamMember,
    onSuccess: () => {
      // invalidate the teams query to refetch the data
      queryClient.invalidateQueries([QueryKeys.Teams])

      toast.success('Team member updated successfully')
    },
  })
}
