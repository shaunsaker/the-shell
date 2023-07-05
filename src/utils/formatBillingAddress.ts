import { validateBillingAddress } from './validateBillingAddress'

export const formatBillingAddress = (billingAddress?: any): string => {
  if (!validateBillingAddress(billingAddress)) {
    return ''
  }

  const { city, line1, line2, state, country, postal_code } = billingAddress

  return `${line1}${line2 ? `, ${line2}` : ''}, ${city}, ${state}, ${postal_code}, ${country}`
}
