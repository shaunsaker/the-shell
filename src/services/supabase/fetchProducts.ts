import { supabase } from '.'

// fetches the products from the database, attach the related prices and order by price low to high
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' })

  if (error) {
    throw error
  }

  return data
}
