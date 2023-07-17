import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const updateTeamMember = async ({ id, teamId, role }: { id: number; teamId: number; role: string }) => {
  const { data, error } = await supabase.functions.invoke('update-team-member', {
    body: {
      id,
      teamId,
      role,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data
}
