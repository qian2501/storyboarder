const js = require('@eslint/js')
const globals = require('globals')
const babelParser = require('@babel/eslint-parser')

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      'no-console': 'off',
      'no-useless-catch': 'warn',
      'no-async-promise-executor': 'warn',
      'no-control-regex': 'warn',
      'no-useless-escape': 'warn',
      'no-case-declarations': 'warn',
      'no-redeclare': 'warn',
      'no-cond-assign': 'warn',
      'valid-typeof': 'warn',
      'no-unreachable': 'warn',
      'no-empty': 'warn'
    }
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'src/build/**',
      '.cache/**',
      'src/js/vendor/**'
    ]
  }
]
