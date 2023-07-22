export const handleApiError = async (error: any) => {
  if (error.context?.json) {
    const json = await error.context?.json()

    throw new Error(json?.error?.message || error.message)
  }

  throw error
}
