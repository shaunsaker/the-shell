export const formatName = ({ firstName, lastName }: { firstName: string | null; lastName: string | null }) => {
  if (!firstName && !lastName) {
    return ''
  }

  return `${firstName} ${lastName}`
}
