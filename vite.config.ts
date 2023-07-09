import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import colors from 'tailwindcss/colors'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import svgr from 'vite-plugin-svgr'

import app from './app.json'

const SHOULD_USE_SENTRY = Boolean(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: SHOULD_USE_SENTRY,
  },

  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        // enables us to size svg's with the css font-size property
        icon: '1em',
      },
    }),
    handlebars({
      context: {
        title: app.displayName,
        description: app.description,
        themeColor: colors[app.baseColor as keyof typeof colors][500],
      },
    }),
    {
      ...(SHOULD_USE_SENTRY &&
        sentryVitePlugin({
          // Note: these values are set via environment variables in Netlify
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
        })),
    },
  ],
})
