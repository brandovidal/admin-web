module.exports = {
  parserOptions: {
    project: '**/tsconfig.json',
    sourceType: 'module'
  },
  rules: {
    'operator-linebreak': 'warn',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'react-hooks/exhaustive-deps': ['warn', { additionalHooks: 'useRecoilCallback' }],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/consistent-indexed-object-style': ['warn', 'index-signature'],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'none'
        },
        singleline: {
          delimiter: 'comma'
        },
        multilineDetection: 'brackets'
      }
    ],
    '@typescript-eslint/no-misused-promises': ['warn', { checksVoidReturn: false }]
  },
  extends: ['next', 'next/core-web-vitals', 'prettier', 'plugin:@typescript-eslint/recommended', 'eslint-config-standard-with-typescript']
}
