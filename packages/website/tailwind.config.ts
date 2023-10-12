import { tailwindTheme } from '../config'

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',

    // Path to the components module
    '../../node_modules/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: tailwindTheme,
}
