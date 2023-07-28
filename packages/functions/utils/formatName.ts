export const formatName = <T extends { first_name: string | null; last_name: string | null }>(
  user: T | null | undefined,
) => {
  if (!user || !user.first_name || !user.last_name) {
    return ''
  }

  return `${user.first_name} ${user.last_name}`
}
