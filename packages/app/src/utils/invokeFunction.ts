import { getSession } from '../auth/api/getSession'

type Functions =
  | 'create-billing-portal-session'
  | 'create-checkout-session'
  | 'delete-team'
  | 'delete-user-account'
  | 'invite-team-members'
  | 'remove-team-member'
  | 'resend-team-invite'
  | 'send-welcome-email'
  | 'update-subscription-quantity'

// adapted from @supabase/functions-js/src/types
type Options = {
  /**
   * Object representing the headers to send with the request.
   * */
  headers?: { [key: string]: string }
  /**
   * The HTTP verb of the request
   */
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
  /**
   * The body of the request.
   */
  body?: File | Blob | ArrayBuffer | FormData | ReadableStream<Uint8Array> | Record<string, any> | string
}

// adapted from @supabase/functions-js/src/types
type ResponseSuccess<T> = {
  data: T
  error: null
}
type ResponseFailure = {
  data: null
  error: any
}
type Response<T> = ResponseSuccess<T> | ResponseFailure

/*
  This is a utility that allows us to interact with our functions.
  It automatically injects the supabase user access token into the request headers.
  It also handles any errors that may occur. 
*/
export const invokeFunction = async <T = any>(functionName: Functions, options?: Options): Promise<Response<T>> => {
  const session = await getSession()

  if (!session) {
    const error = new Error('No session found')

    return {
      data: null,
      error,
    }
  }

  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9999' : window.location.origin
  const url = `${baseUrl}/.netlify/functions/${functionName}`
  const headers = {
    ...options?.headers,
    authorization: `Bearer ${session.access_token}`,
  }

  const body = options?.body ? JSON.stringify(options.body) : undefined
  const method = options?.method || 'POST'
  const fetchOptions = { headers, method, body }

  try {
    const response = await fetch(url, fetchOptions)
    const data = (await response.json()) as T

    if (response.status !== 200) {
      // @ts-expect-error FIXME: types
      const error = new Error(data.message || data.errorMessage)

      return {
        data: null,
        error,
      }
    }

    return { data, error: null }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
