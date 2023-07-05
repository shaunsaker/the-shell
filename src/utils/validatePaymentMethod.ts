type PaymentMethod = {
  last4: number
}

export const validatePaymentMethod = (object: unknown): object is PaymentMethod => {
  if (!object) {
    return false
  }

  if (typeof object !== 'object') {
    return false
  }

  const castedObject = object as Record<string, any>

  if (!castedObject['last4'] && typeof castedObject['last4'] !== 'string') {
    return false
  }

  return true
}
