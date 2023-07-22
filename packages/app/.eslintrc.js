module.exports = {
  root: true,
  extends: ['custom', 'react-app', 'plugin:react-hooks/recommended', 'plugin:tailwindcss/recommended'],
  plugins: ['react', 'react-hooks', 'tailwindcss'],
  rules: {
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
  },
}
