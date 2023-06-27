import React, { ReactElement } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from './components/errorBoundary/PageNotFound'
import { Loading } from './components/loading/Loading'
import { SettingsLayout } from './components/settingsLayout/SettingsLayout'
import { Dashboard } from './pages/dashboard/Dashboard'
import ForgotPassword from './pages/forgot-password'
import { SettingsAccount } from './pages/settings/account/SettingsAccount'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import { routes } from './routes'
import { useAuthSession } from './store/user/useAuthSession'

const errorElement = <ErrorBoundary />

const authRouter = createBrowserRouter([
  {
    path: routes.signUp,
    element: <SignUp />,
    errorElement,
  },
  {
    path: routes.signIn,
    element: <SignIn />,
    errorElement,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
    errorElement,
  },
  { path: '*', element: <Navigate to={routes.signIn} /> },
])

const router = createBrowserRouter([
  {
    path: routes.dashboard,
    element: <Dashboard />,
    errorElement,
  },
  {
    element: <SettingsLayout />,
    children: [
      {
        path: routes.settings,
        element: <Navigate to={routes.settingsAccount} />,
        errorElement,
      },
      {
        path: routes.settingsAccount,
        element: <SettingsAccount />,
        errorElement,
      },
    ],
  },
  { path: '*', element: <Navigate to={routes.dashboard} /> },
])

export const Router = (): ReactElement => {
  const { session, loading } = useAuthSession()

  if (loading) {
    return <Loading />
  }

  return <RouterProvider router={session ? router : authRouter} />
}
