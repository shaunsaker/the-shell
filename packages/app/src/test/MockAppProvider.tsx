import React, { ReactElement } from 'react'

import { AppProvider } from '../components/appProvider/AppProvider'
import { MockRouter } from './MockRouter'

type MockAppProviderProps = {
  children: ReactElement
}

export const MockAppProvider = ({ children }: MockAppProviderProps): ReactElement => (
  <AppProvider>
    <MockRouter>{children}</MockRouter>
  </AppProvider>
)
