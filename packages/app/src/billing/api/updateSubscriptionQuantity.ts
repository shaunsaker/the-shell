import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const updateSubscriptionQuantityFunction = invokeFunction(Functions.updateSubscriptionQuantity)

export const updateSubscriptionQuantity = async (quantity: number) => {
  const response = await updateSubscriptionQuantityFunction({ quantity })

  return response
}
