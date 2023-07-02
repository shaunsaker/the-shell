import { useQuery } from '@tanstack/react-query'

import { fetchProducts } from '../../services/supabase/fetchProducts'

export const useProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: fetchProducts })
}
