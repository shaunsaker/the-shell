import { TeamWithTeamMembers } from '../../models'
import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const fetchTeams = async () => {
  const { data, error } = await supabase.functions.invoke('fetch-teams')

  if (error) {
    await handleApiError(error)
  }

  return data as TeamWithTeamMembers[]
}
