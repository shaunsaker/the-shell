import { TeamMemberRole } from '../../models'
import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const updateTeamMember = async ({ id, role }: { id: number; role: TeamMemberRole }) => {
  const { data, error } = await supabase.from('team_members').update({ role }).eq('id', id)

  if (error) {
    await handleApiError(error)
  }

  return data
}
