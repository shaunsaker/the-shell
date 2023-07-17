import { supabaseAdmin } from './supabaseAdmin.ts'

export const updateTeamMemberRecord = async ({ id, role }: { id: number; role: string }) => {
  const { data, error } = await supabaseAdmin.from('team_members').update({ role }).eq('id', id).select().single()

  if (error) {
    throw error
  }

  console.log(`Team member updated: ${data.id}`)

  return data
}
