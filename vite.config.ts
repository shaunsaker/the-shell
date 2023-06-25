import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import svgr from 'vite-plugin-svgr'

import pkg from './package.json'

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

    // @ts-expect-error vite-plugin-handlebars types incorrect
    handlebars({
      context: {
        title: pkg.app.displayName,
        description: pkg.description,
        themeColor: pkg.app.themeColor,
        backgroundColor: pkg.app.backgroundColor,
      },
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
