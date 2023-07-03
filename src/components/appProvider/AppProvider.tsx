import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement, ReactNode } from 'react'
import { toast } from 'react-hot-toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    // enables global error handling
    onError(error) {
      console.error(error)

      // TODO: SS sentry.captureException(error)

      toast.error((error as Error).message)
    },
  }),
  mutationCache: new MutationCache({
    // enables global error handling
    onError(error) {
      console.error(error)

      // TODO: SS sentry.captureException(error)

      toast.error((error as Error).message)
    },
  }),
})

type Props = { children: ReactNode }

export const AppProvider = ({ children }: Props): ReactElement => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
