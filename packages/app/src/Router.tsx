import React, { ReactElement } from 'react'
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import { useAuthUser } from './auth/hooks/useAuthUser'
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary'
import { Loading } from './components/loading/Loading'
import { MainLayout } from './components/mainLayout/MainLayout'
import { SettingsLayout } from './components/settingsLayout/SettingsLayout'
import { Dashboard } from './pages/dashboard'
import ForgotPassword from './pages/forgotPassword'
import { SettingsAccount } from './pages/settings/account'
import { SettingsResetPassword } from './pages/settings/account/resetPassword'
import { SettingsSubscription } from './pages/settings/subscription'
import { SettingsTeams } from './pages/settings/teams'
import { SettingsAddTeam } from './pages/settings/teams/addTeam'
import { SettingsEditTeam } from './pages/settings/teams/editTeam'
import { SettingsDeleteTeam } from './pages/settings/teams/editTeam/deleteTeam'
import { SettingsEditTeamMember } from './pages/settings/teams/editTeamMember'
import { SettingsRemoveTeamMember } from './pages/settings/teams/editTeamMember/removeTeamMember'
import { SettingsInviteTeamMembers } from './pages/settings/teams/inviteTeamMembers/SettingsInviteTeamMembers'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import UserManagement from './pages/userManagement'
import { routes } from './routes'

const errorElement = <ErrorBoundary />

const userManagementRoute = {
  path: routes.userManagement,
  element: <UserManagement />,
  errorElement,
}

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
]

// we only want to add the user management route to the unauthorised routes in production because
// in development, firebase automatically verifies the email when the email action link is clicked
if (import.meta.env.MODE !== 'development') {
  unauthorisedRoutes.push(userManagementRoute)
}

unauthorisedRoutes.push({ path: '*', element: <Navigate to={routes.signIn} /> })

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
            path: routes.settingsResetPassword,
            element: <SettingsResetPassword />,
            errorElement,
          },

          {
            path: routes.settingsSubscription,
            element: <SettingsSubscription />,
            errorElement,
          },
          {
            path: routes.settingsTeams,
            element: <SettingsTeams />,
            children: [
              {
                path: routes.settingsAddTeam,
                element: <SettingsAddTeam />,
                errorElement,
              },
            ],
            errorElement,
          },
          {
            path: routes.settingsEditTeam,
            element: <SettingsEditTeam />,
            children: [
              {
                path: routes.settingsDeleteTeam,
                element: <SettingsDeleteTeam />,
                errorElement,
              },
            ],
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

// we only want to add the user management route to the authorised routes in development because
// in development, firebase automatically verifies the email when the email action link is clicked
if (import.meta.env.MODE === 'development') {
  authorisedRoutes.push(userManagementRoute)
}

authorisedRoutes.push({ path: '*', element: <Navigate to={routes.dashboard} /> })

const unauthorisedRouter = createBrowserRouter(unauthorisedRoutes)
const authorisedRouter = createBrowserRouter(authorisedRoutes)

export const Router = (): ReactElement => {
  const { data: authUser, isLoading: authUserLoading } = useAuthUser()

  const isAuthenticated = authUser && authUser.emailVerified // maybe we should also check if the user has data?

  if (authUserLoading) {
    return <Loading />
  }

  return <RouterProvider router={isAuthenticated ? authorisedRouter : unauthorisedRouter} />
}
