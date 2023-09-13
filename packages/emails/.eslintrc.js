module.exports = {
  root: true,
  extends: ['react-app', 'plugin:tailwindcss/recommended', 'custom'],
  plugins: ['react', 'tailwindcss'],
  rules: {
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
  },
}
