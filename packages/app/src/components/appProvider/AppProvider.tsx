'use client'
import { ReactElement, ReactNode } from 'react'

import { Listeners } from '../listeners/Listeners'
import { Snackbar } from '../snackbar/Snackbar'
import { QueryClientProvider } from './QueryClientProvider'

type Props = { children: ReactNode }

export const AppProvider = ({ children }: Props): ReactElement => {
  return (
    <QueryClientProvider>
      <Listeners />

      {children}

      <Snackbar />
    </QueryClientProvider>
  )
}
