import React, { ReactElement } from 'react'
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import { useAuthUser } from '../auth/hooks/useAuthUser'
import { ErrorBoundary } from '../components/errorBoundary/ErrorBoundary'
import { Loading } from '../components/loading/Loading'
import { MainLayout } from '../components/mainLayout/MainLayout'
import { SettingsLayout } from '../components/settingsLayout/SettingsLayout'
import { Dashboard } from '../pages/dashboard'
import ForgotPassword from '../pages/forgotPassword'
import { SettingsAccount } from '../pages/settings/account'
import { SettingsSubscription } from '../pages/settings/subscription'
import { SettingsEditTeam } from '../pages/settings/teams/editTeam'
import { SettingsEditTeamMember } from '../pages/settings/teams/editTeamMember'
import { SettingsRemoveTeamMember } from '../pages/settings/teams/editTeamMember/removeTeamMember'
import { SettingsInviteTeamMembers } from '../pages/settings/teams/inviteTeamMembers/SettingsInviteTeamMembers'
import SignIn from '../pages/signIn'
import SignUp from '../pages/signUp'
import UserManagement from '../pages/userManagement'
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
            path: routes.settingsEditTeam,
            element: <SettingsEditTeam />,
            errorElement,
          },
          {
            path: routes.settingsInviteTeamMembers,
            element: <SettingsInviteTeamMembers />,
            errorElement,
          },
          {
            path: routes.settingsEditTeamMember,
            element: <SettingsEditTeamMember />,
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

export const Router = (): ReactElement => {
  const { data: authUser, isLoading: authUserLoading } = useAuthUser()

  const isLoading = authUserLoading

  // the user can view the authenticated stack if they have auth and their email is verified
  const isAuthenticated = authUser && authUser.emailVerified

  if (isLoading) {
    return <Loading />
  }

  return <RouterProvider router={isAuthenticated ? authorisedRouter : unauthorisedRouter} />
}
