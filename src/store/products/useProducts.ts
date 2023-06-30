import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { fetchProducts } from '../../services/supabase/fetchProducts'
import { Database } from '../../typings/db'

type Product = Database['public']['Tables']['products']['Row']
type Price = Database['public']['Tables']['prices']['Row']
export type BillingInterval = Database['public']['Enums']['pricing_plan_interval']

export type ProductWithPrices = {
  prices: Price[]
} & Product

const atom = atomWithStorage<ProductWithPrices[]>('products', [])

const useProductsAtom = () => useAtom(atom)

export const useProducts = () => {
  const [products, setProducts] = useProductsAtom()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    fetchProducts().then(({ data, error }) => {
      if (error) {
        toast.error(error.message)
      } else {
        setProducts(data)
      }

      setLoading(false)
    })
  }, [setProducts])

  return { products, loading }
}
