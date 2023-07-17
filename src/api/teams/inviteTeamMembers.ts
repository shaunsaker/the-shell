import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const inviteTeamMembers = async ({ teamId, emails }: { teamId: string; emails: string[] }) => {
  const { data, error } = await supabase.functions.invoke('invite-team-members', {
    body: {
      teamId,
      emails,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
