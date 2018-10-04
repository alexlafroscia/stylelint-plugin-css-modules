module.exports = {
  plugins: ['node', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:node/recommended'
  ],
  rules: {
    'node/no-unsupported-features/node-builtins': [
      'error',
      {
        version: '>=8.0.0'
      }
    ]
  },
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
      env: {
        es6: true
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
      },
      rules: {
        'node/no-unsupported-features/es-syntax': 'off'
      }
    }
  ]
};
