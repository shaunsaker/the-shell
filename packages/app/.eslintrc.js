module.exports = {
  root: true,
  extends: ['custom', 'next/core-web-vitals', 'plugin:tailwindcss/recommended'],
  plugins: ['tailwindcss'],
  rules: {
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
  },
}
