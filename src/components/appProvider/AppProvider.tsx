import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react'

import { Snackbar } from '../snackbar/Snackbar'

const queryClient = new QueryClient()

type Props = { children: ReactElement }

export const AppProvider = ({ children }: Props): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Snackbar />
    </QueryClientProvider>
  )
}
