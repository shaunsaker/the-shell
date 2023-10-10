import { Snackbar } from 'components'
import React, { ReactElement } from 'react'

import { AppProvider } from '@/components/appProvider/AppProvider'
import { Listeners } from '@/components/listeners/Listeners'
import { Router } from '@/router/Router'

export const App = (): ReactElement => {
  return (
    <AppProvider>
      <Listeners />

      <Router />

      <Snackbar />
    </AppProvider>
  )
}
