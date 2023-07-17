import { supabaseAdmin } from './supabaseAdmin.ts'

export const updateTeamRecord = async ({ id, name }: { id: number; name: string }) => {
  const { data, error } = await supabaseAdmin.from('teams').update({ name }).eq('id', id).select().single()

  if (error) {
    throw error
  }

  console.log(`Team updated: ${data.id}`)

  return data
}
