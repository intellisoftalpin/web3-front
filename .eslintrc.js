module.exports = {
    env: {
        browser: true, es2021: true
    },
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:i18next/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        project: ['tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', 'i18next', 'react-hooks'],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/react-in-jsx-scope': 'off',
        indent: [2, 4],
        '@typescript-eslint/indent': [2, 4],
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off'
    }
}
