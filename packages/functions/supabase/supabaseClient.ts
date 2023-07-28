import { createClient } from '@supabase/supabase-js'

import { Database } from '../types/supabase'

// Note: this is a client that uses the user's JWT token via the Request to access the database.
// and allows us to retrieve the authenticated user's data.
export const supabaseClient = (authHeaders = '') =>
  createClient<Database>(
    // Supabase API URL - env var exported by default.
    process.env.SUPABASE_URL ?? '',
    // Supabase API anon key - env var exported by default.
    process.env.SUPABASE_ANON_KEY ?? '',
    {
      auth: {
        persistSession: false,
      },
      global: { headers: { Authorization: authHeaders } },
    },
  )
