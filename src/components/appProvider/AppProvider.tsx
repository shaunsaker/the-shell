import { ReactElement, ReactNode } from 'react'

import { QueryClientProvider } from './QueryClientProvider'

type Props = { children: ReactNode }

export const AppProvider = ({ children }: Props): ReactElement => {
  return <QueryClientProvider>{children}</QueryClientProvider>
}
