import react from '@vitejs/plugin-react'
import colors from 'tailwindcss/colors'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import svgr from 'vite-plugin-svgr'

import app from './app.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        // enables us to size svg's with the css font-size property
        icon: '1em',
      },
    }),

    // @ts-expect-error vite-plugin-handlebars types are incorrect
    handlebars({
      context: {
        title: app.displayName,
        description: app.description,
        themeColor: colors[app.baseColor as keyof typeof colors][500],
      },
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
