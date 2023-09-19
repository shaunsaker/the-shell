import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateTeamMember } from '../../teams/api/updateTeamMember'
import { getTeamMembersQueryKey } from '../../types'

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTeamMember,
    onSuccess: (_, { teamId }) => {
      // invalidate the team members query to refetch the data
      queryClient.invalidateQueries([getTeamMembersQueryKey(teamId)])

      toast.success('Team member updated successfully')
    },
  })
}
