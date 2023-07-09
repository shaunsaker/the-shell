import { useQuery } from '@tanstack/react-query'

import { fetchProducts } from '../../api/db/fetchProducts'

export const useProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: fetchProducts })
}