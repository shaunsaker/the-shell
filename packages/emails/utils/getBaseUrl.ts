export const getBaseUrl = (): string => {
  const baseUrl =
    process.env.CONTEXT !== 'dev'
      ? process.env.SITE_URL
      : // Note: this is the port that app dev uses
        'http://localhost:5173'

  if (!baseUrl) {
    throw new Error('baseUrl is not defined')
  }

  return baseUrl
}
