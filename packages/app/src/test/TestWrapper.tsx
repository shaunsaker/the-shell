import React, { ReactElement } from 'react'

import { AppProvider } from '../components/appProvider/AppProvider'

type TestWrapperProps = {
  children: ReactElement
}

export const TestWrapper = ({ children }: TestWrapperProps): ReactElement => <AppProvider>{children}</AppProvider>
