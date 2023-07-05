type BillingAddress = {
  city: string
  line1: string
  line2?: string
  state: string
  country: string
  postal_code: string
}

export const validateBillingAddress = (object: unknown): object is BillingAddress => {
  if (!object) {
    return false
  }

  if (typeof object !== 'object') {
    return false
  }

  const castedObject = object as Record<string, any>

  if (!castedObject['city'] && typeof castedObject['city'] !== 'string') {
    return false
  }

  if (!castedObject['line1'] && typeof castedObject['line1'] !== 'string') {
    return false
  }

  if (!castedObject['state'] && typeof castedObject['state'] !== 'string') {
    return false
  }

  if (!castedObject['country'] && typeof castedObject['country'] !== 'string') {
    return false
  }

  if (!castedObject['postal_code'] && typeof castedObject['postal_code'] !== 'string') {
    return false
  }

  return true
}
