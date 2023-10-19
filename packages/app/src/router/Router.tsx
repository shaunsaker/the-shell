import { ErrorBoundary } from '@sentry/react'
import { Loading } from 'components'
import React from 'react'
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { MainLayout } from '@/components/mainLayout/MainLayout'
import { SettingsLayout } from '@/components/settingsLayout/SettingsLayout'
import { Dashboard } from '@/pages/dashboard'
import { ForgotPassword } from '@/pages/forgotPassword'
import { SettingsAccount } from '@/pages/settings/account'
import { SettingsSubscription } from '@/pages/settings/subscription'
import { SettingsInviteTeamMembers } from '@/pages/settings/teams/inviteTeamMembers'
import { SettingsTeam } from '@/pages/settings/teams/team'
import { SettingsTeamMember } from '@/pages/settings/teams/teamMember'
import { SettingsRemoveTeamMember } from '@/pages/settings/teams/teamMember/removeTeamMember'
import { SignIn } from '@/pages/signIn'
import { SignUp } from '@/pages/signUp'
import { UserManagement } from '@/pages/userManagement'

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
  {
    path: routes.userManagement,
    element: <UserManagement />,
    errorElement,
  },
  { path: '*', element: <Navigate to={routes.signIn} /> },
]

const authorisedRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
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
          {
            path: routes.settingsSubscription,
            element: <SettingsSubscription />,
            errorElement,
          },
          {
            path: routes.settingsTeam,
            element: <SettingsTeam />,
            errorElement,
          },
          {
            path: routes.settingsInviteTeamMembers,
            element: <SettingsInviteTeamMembers />,
            errorElement,
          },
          {
            path: routes.settingsTeamMember,
            element: <SettingsTeamMember />,
            children: [
              {
                path: routes.settingsRemoveTeamMember,
                element: <SettingsRemoveTeamMember />,
                errorElement,
              },
            ],
            errorElement,
          },
          { path: '*', element: <Navigate to={routes.settingsAccount} /> },
        ],
        errorElement,
      },
      { path: '*', element: <Navigate to={routes.dashboard} /> },
    ],
  },
]

const unauthorisedRouter = createBrowserRouter(unauthorisedRoutes)
const authorisedRouter = createBrowserRouter(authorisedRoutes)

export const Router = () => {
  const { data: authUser, isLoading: authUserLoading } = useAuthUser()

  const isLoading = authUserLoading

  // the user can view the authenticated stack if they have auth and their email is verified
  const isAuthenticated = authUser && authUser.emailVerified

  if (isLoading) {
    return <Loading />
  }

  return <RouterProvider router={isAuthenticated ? authorisedRouter : unauthorisedRouter} />
}
