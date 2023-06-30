import { supabase } from '.'

// fetches the products from the database and attach the related prices
export const fetchProducts = async () => {
  const response = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' })

  return response
}
