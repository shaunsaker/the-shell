import React, { ReactElement } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from './components/errorBoundary/PageNotFound'
import { Dashboard } from './pages/dashboard/Dashboard'
import { routes } from './routes'

const router = createBrowserRouter([
  {
    path: routes.dashboard,
    element: <Dashboard />,
    errorElement: <ErrorBoundary />,
  },
])

export const Router = (): ReactElement => {
  return <RouterProvider router={router} />
}
