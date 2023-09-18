const ERROR = 'error'
const OFF = 'off'

module.exports = {
  root: true,
  extends: [
    'react-app',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    'custom',
  ],
  plugins: ['react', 'react-hooks', 'tailwindcss'],
  rules: {
    'react/no-unescaped-entities': OFF,
    'react/display-name': OFF,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,
    'tailwindcss/no-custom-classname': OFF,
    'tailwindcss/classnames-order': OFF,
  },
}
