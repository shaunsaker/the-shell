import { redirect, usePathname } from 'next/navigation'

import { routes } from '../../routes'
import { useSession } from './useSession'

// TODO: SS use middleware for this
export const useAuthRedirect = () => {
  const { data: session, isLoading } = useSession()
  const pathname = usePathname()

  // If the session is loading, we don't know if the user is logged in or not.
  if (!isLoading) {
    const isAuthPage = pathname === routes.signIn || pathname === routes.signUp || pathname === routes.forgotPassword

    // If there is no session and we are not on the sign in page, redirect to the sign in page.
    if (!session && !isAuthPage) {
      redirect(routes.signIn)
    }

    // TODO: SS handle this case
    // redirect(routes.dashboard)
  }
}
