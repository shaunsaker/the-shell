declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTEXT: 'dev' | 'branch-deploy' | 'production'
      DEPLOY_PRIME_URL: string
      SUPABASE_URL: string
      SUPABASE_ANON_KEY: string
      SUPABASE_SERVICE_ROLE_KEY: string
      STRIPE_API_KEY: string
      STRIPE_WEBHOOK_SIGNING_SECRET: string
      RESEND_API_KEY: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
