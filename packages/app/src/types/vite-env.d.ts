/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_MIXPANEL_TOKEN: string
  readonly VITE_SENTRY_AUTH_TOKEN: string
  readonly VITE_SENTRY_ORG: string
  readonly VITE_SENTRY_PROJECT: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_SENTRY_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
