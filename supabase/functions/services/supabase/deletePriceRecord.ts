import { supabase } from './index.ts'

export const deletePriceRecord = async (id: string) => {
  const { error } = await supabase.from('prices').delete().eq('id', id)
  if (error) throw error
  console.log(`Price deleted: ${id}`)
}
