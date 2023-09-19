import { usePrices } from './usePrices'
import { useProducts } from './useProducts'
import { useSubscription } from './useSubscription'

export const useHasTeamPlan = () => {
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription()
  const { data: prices, isLoading: pricesLoading } = usePrices()
  const { data: products, isLoading: productsLoading } = useProducts()

  const activePrice = prices?.find(price => price.id === subscription?.priceId)
  const activeProduct = products?.find(product => product.id === activePrice?.productId)
  const hasTeamPlan = Boolean(activeProduct?.metadata?.teamPlan)
  const isLoading = subscriptionLoading || pricesLoading || productsLoading

  return {
    data: hasTeamPlan,
    isLoading,
  }
}
