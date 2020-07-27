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
    'no-console': 'off',
    // 生产环境代码里 不允许出现  debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    // project: './tsconfig.json',
    // sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
}
