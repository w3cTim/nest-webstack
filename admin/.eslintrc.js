module.exports = {
  root: true,

  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/prettier', // @vue/eslint-config-prettier 关键包
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    // project: './tsconfig.json',
    // sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
}
