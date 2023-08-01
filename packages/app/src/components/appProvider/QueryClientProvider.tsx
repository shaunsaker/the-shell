import { PostgrestError } from '@supabase/supabase-js'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryClientProviderPrimitive,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactElement, ReactNode } from 'react'
import { toast } from 'react-hot-toast'

import { signOut } from '../../auth/api/signOut'
import { captureException } from '../../errors/captureException'

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
      if ((error as PostgrestError).message === 'Unauthorized' || (error as PostgrestError).message === 'JWT expired') {
        signOut()
      } else {
        captureException(error)

        toast.error((error as Error).message)
      }
    },
  }),
  mutationCache: new MutationCache({
    // enables global error handling
    onError(error) {
      console.error(error)

      captureException(error)

      toast.error((error as Error).message)
    },
  }),
})

type Props = { children: ReactNode }

export const QueryClientProvider = ({ children }: Props): ReactElement => {
  return (
    <QueryClientProviderPrimitive client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" panelPosition="right" />
    </QueryClientProviderPrimitive>
  )
}
