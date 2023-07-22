import { useQuery } from '@tanstack/react-query'

import { fetchProducts } from '../../api/subscription/fetchProducts'
import { QueryKeys } from '../../models'

export const useProducts = () => {
  return useQuery({ queryKey: [QueryKeys.Products], queryFn: fetchProducts })
}
