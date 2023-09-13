import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../../models'
import { getPrices } from '../api/getPrices'

export const usePrices = () => {
  return useQuery({ queryKey: [QueryKeys.Prices], queryFn: getPrices })
}
