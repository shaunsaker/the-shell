import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { resendTeamInvite } from '../../teams/resendTeamInvite'

export const useResendTeamInvite = () => {
  return useMutation({
    mutationFn: resendTeamInvite,
    onSuccess: () => {
      toast.success("An invite has been sent to your team member's inbox.")
    },
  })
}
