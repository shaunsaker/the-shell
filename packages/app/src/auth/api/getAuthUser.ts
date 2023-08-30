import { auth } from '../../firebase'

export const getAuthUser = () => {
  const user = auth.currentUser

  return user
}
