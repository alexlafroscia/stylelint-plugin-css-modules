module.exports = {
  plugins: ['node', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:node/recommended'
  ],
  overrides: [
    // All Test-Related Files
    {
      files: ['test/**/*.js'],
      rules: {
        'node/no-unpublished-require': 'off'
      }
    },
    // AVA Tests
    {
      files: ['test/**/*-test.js'],
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      rules: {
        'node/no-unsupported-features/es-syntax': 'off'
      }
    }
  ]
};
