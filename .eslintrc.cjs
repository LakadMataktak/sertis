module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  "ignorePatterns": ["temp.js", "**/node_modules/", "**/public/"],
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
}
