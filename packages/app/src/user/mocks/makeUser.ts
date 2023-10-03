import { User } from 'types'

export const makeUser = ({
  id = '1',
  createdAt = '2020-01-01T00:00:00.000Z',
  email = 'frank.gallagher@gmail.com',
  firstName = 'Frank',
  lastName = 'Gallagher',
}: Partial<User>): User => ({
  id,
  createdAt,
  email,
  firstName,
  lastName,
})
