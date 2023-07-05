import { PostgrestError } from '@supabase/supabase-js'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryClientProviderPrimitive,
} from '@tanstack/react-query'
import { ReactElement, ReactNode } from 'react'
import { toast } from 'react-hot-toast'

import { signOut } from '../../api/auth/signOut'

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

      // if the user is unauthorised, sign them out
      if ((error as PostgrestError).message === 'JWT expired') {
        signOut()
      } else {
        // TODO: SS sentry.captureException(error)

        toast.error((error as Error).message)
      }
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

export const QueryClientProvider = ({ children }: Props): ReactElement => {
  return <QueryClientProviderPrimitive client={queryClient}>{children}</QueryClientProviderPrimitive>
}
