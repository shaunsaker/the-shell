import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.26.0'

// Note: supabase uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
export const supabase = createClient(
  // Supabase API URL - env var exported by default.
  Deno.env.get('SUPABASE_URL') ?? '',
  // Supabase API SERVICE ROLE KEY - env var exported by default.
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  {
    auth: {
      persistSession: false,
    },
  }
)

// Note: this is a client that uses the user's JWT token to access the database.
// and allows us to retrieve the authenticated user's data.
export const supabaseClient = (request: Request) =>
  createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API anon key - env var exported by default.
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      auth: {
        persistSession: false,
      },
      global: { headers: { Authorization: request.headers.get('Authorization') || '' } },
    }
  )
