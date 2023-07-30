import { supabase } from '../supabase'
import { handleApiError } from '../utils/handleApiError'

export const createTeam = async ({ name, userId }: { name: string; userId: string }) => {
  const { data: team, error } = await supabase
    .from('teams')
    .insert([
      {
        name,
        created_by: userId,
      },
    ])
    .select()
    .single()

  if (error) {
    await handleApiError(error)
  }

  if (!team) {
    throw new Error('Missing team!')
  }

  return team
}
