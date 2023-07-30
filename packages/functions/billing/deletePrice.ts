import { supabaseAdmin } from '../supabaseAdmin'

export const deletePrice = async (id: string) => {
  const { error } = await supabaseAdmin.from('prices').delete().eq('id', id)

  if (error) {
    throw error
  }

  console.log(`Price deleted: ${id}`)
}
