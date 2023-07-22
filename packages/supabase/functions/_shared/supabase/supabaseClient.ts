import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.26.0'

// Note: this is a client that uses the user's JWT token via the Request to access the database.
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
    },
  )
