import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const inviteTeamMembers = async ({
  teamId,
  emails,
  redirectTo,
}: {
  teamId: string
  emails: string[]
  redirectTo: string
}) => {
  const { data, error } = await supabase.functions.invoke('invite-team-members', {
    body: {
      teamId,
      emails,
      redirectTo,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
