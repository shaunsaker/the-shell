import React, { ReactElement } from 'react'

import { AppProvider } from './components/appProvider/AppProvider'
import { Snackbar } from './components/snackbar/Snackbar'
import { Router } from './Router'

export const App = (): ReactElement => {
  return (
    <AppProvider>
      <Router />

      <Snackbar />
    </AppProvider>
  )
}
