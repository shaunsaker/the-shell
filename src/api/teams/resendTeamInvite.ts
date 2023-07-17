import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const resendTeamInvite = async ({ teamId, email }: { teamId: number; email: string }) => {
  const { data, error } = await supabase.functions.invoke('resend-team-invite', {
    body: {
      teamId,
      email,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
