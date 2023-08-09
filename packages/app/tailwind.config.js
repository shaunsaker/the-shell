import defaultTheme from 'tailwindcss/defaultTheme'

import themeColors from '../common/themeColors.json'

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // we extract the colors to themeColors so that we can change them easily using our helper script
      // yarn gen:theme --baseColor teal --neutralColor gray
      // but if you would prefer to hardcode the colors, you can do that too
      colors: themeColors,
    },
  },
}
