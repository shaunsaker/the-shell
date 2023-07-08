export const getISOString = (time: number) => {
  const date = new Date(time)
  const isoString = date.toISOString()

  return isoString
}
