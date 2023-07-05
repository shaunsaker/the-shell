import React, { ReactElement } from 'react'
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary'
import { Loading } from './components/loading/Loading'
import { SettingsLayout } from './components/settingsLayout/SettingsLayout'
import { useOnAuthStateChange } from './hooks/auth/useOnAuthStateChange'
import { useSession } from './hooks/auth/useSession'
import { useSubscriptions } from './hooks/db/useSubscriptions'
import { Dashboard } from './pages/dashboard/Dashboard'
import ForgotPassword from './pages/forgot-password'
import { SettingsAccount } from './pages/settings/account/SettingsAccount'
import { SettingsBilling } from './pages/settings/billing/SettingsBilling'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import { routes } from './routes'

const errorElement = <ErrorBoundary />

const unauthorisedRoutes: RouteObject[] = [
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
]

const settingsRoutes: RouteObject[] = [
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
      {
        path: routes.settingsBilling,
        element: <SettingsBilling />,
        errorElement,
      },
    ],
    errorElement,
  },
]

export const subscribedRoutes: RouteObject[] = [
  {
    path: routes.dashboard,
    element: <Dashboard />,
    errorElement,
  },
  { path: '*', element: <Navigate to={routes.dashboard} /> },
]

const unauthorisedRouter = createBrowserRouter([...unauthorisedRoutes])
const unsubscribedRouter = createBrowserRouter([
  ...settingsRoutes,
  { path: '*', element: <Navigate to={routes.settingsBilling} /> },
])
const subscribedRouter = createBrowserRouter([...subscribedRoutes, ...settingsRoutes])

export const Router = (): ReactElement => {
  useOnAuthStateChange()
  const { data: session, isLoading: sessionLoading } = useSession()
  const { data: subscriptions, isLoading: subscriptionLoading } = useSubscriptions()

  const hasSubscription = subscriptions && subscriptions.length > 0

  if (sessionLoading || subscriptionLoading) {
    return <Loading />
  }

  return (
    <RouterProvider router={session ? (hasSubscription ? subscribedRouter : unsubscribedRouter) : unauthorisedRouter} />
  )
}
