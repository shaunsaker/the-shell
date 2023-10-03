const OFF = 'off'

module.exports = {
  root: true,
  extends: ['react-app', 'plugin:tailwindcss/recommended', 'custom'],
  plugins: ['react', 'tailwindcss'],
  rules: {
    'react/no-unescaped-entities': OFF,
    'react/display-name': OFF,
    'tailwindcss/no-custom-classname': OFF,
    'tailwindcss/classnames-order': OFF,
  },
}
