import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const resendTeamInvite = async ({
  teamId,
  email,
  redirectTo,
}: {
  teamId: number
  email: string
  redirectTo: string
}) => {
  const { data, error } = await supabase.functions.invoke('resend-team-invite', {
    body: {
      teamId,
      email,
      redirectTo,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
