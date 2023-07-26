import { createClient } from '@supabase/supabase-js'

// as it has admin privileges and overwrites RLS policies!
export const supabaseAdmin = createClient(
  // Supabase API URL - env var exported by default.
  process.env.SUPABASE_URL ?? '',
  // Note: supabase uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
  // Supabase API SERVICE ROLE KEY - env var exported by default.
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  {
    auth: {
      persistSession: false,
    },
  },
)
