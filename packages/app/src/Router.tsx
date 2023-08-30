import React, { ReactElement } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

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
import { SettingsAcceptInvite } from './pages/settings/teams/editTeam/acceptInvite'
import { SettingsDeleteTeam } from './pages/settings/teams/editTeam/deleteTeam'
import { SettingsEditTeamMember } from './pages/settings/teams/editTeamMember'
import { SettingsRemoveTeamMember } from './pages/settings/teams/editTeamMember/removeTeamMember'
import { SettingsInviteTeamMembers } from './pages/settings/teams/inviteTeamMembers/SettingsInviteTeamMembers'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import { routes } from './routes'

const errorElement = <ErrorBoundary />

const unauthorisedRouter = createBrowserRouter([
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

const authorisedRouter = createBrowserRouter([
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
            path: routes.settingsAcceptInvite,
            element: <SettingsAcceptInvite />,
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
])

export const Router = (): ReactElement => {
  const { data: authUser, isLoading: sessionLoading } = useAuthUser()

  if (sessionLoading) {
    return <Loading />
  }

  return <RouterProvider router={authUser ? authorisedRouter : unauthorisedRouter} />
}
