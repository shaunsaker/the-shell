import { supabaseAdmin } from './supabaseAdmin.ts'

export const insertTeamRecord = async ({ name, createdById }: { name: string; createdById: string }) => {
  const teamData = {
    name,
    created_by: createdById,
  }

  const { data, error } = await supabaseAdmin.from('teams').insert([teamData]).select().single()

  if (error) {
    throw error
  }

  console.log(`Team inserted: ${data.id}`)

  return data
}
