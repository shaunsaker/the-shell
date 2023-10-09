import defaultTheme from 'tailwindcss/defaultTheme'

import { themeColors } from '../config'

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // we extract the colors to themeColors so that we can change them easily using our helper script
      // yarn gen:theme --themeColor teal --neutralColor gray
      // but if you would prefer to hardcode the colors, you can do that too
      colors: themeColors,
    },
  },
  // Note: these have been added to handle dynamic tailwind classes, e.g. custom Button colors
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:300|400|500|700|800))$/,
      variants: ['hover', 'focus-visible', 'dark', 'dark:hover', 'dark:focus-visible'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:300|400|500|700|800))$/,
      variants: ['hover', 'focus-visible', 'dark', 'dark:hover', 'dark:focus-visible'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:300|400|500|700|800))$/,
      variants: ['hover', 'focus-visible', 'dark', 'dark:hover', 'dark:focus-visible'],
    },
    {
      pattern:
        /^(outline-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:300|400|500|700|800))$/,
      variants: ['hover', 'focus-visible', 'dark', 'dark:hover', 'dark:focus-visible'],
    },
  ],
}
