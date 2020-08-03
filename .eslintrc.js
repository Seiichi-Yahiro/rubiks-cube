const path = require('path');
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'css-modules'],
    env: {
        browser: true,
        jest: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:react/recommended',
        'prettier/react', // disables react-specific linting rules that conflict with prettier
        'plugin:react-hooks/recommended',
        'plugin:css-modules/recommended',
    ],
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020, // 2020 is es version 11
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        extraFileExtensions: [],
    },
    rules: {
        // Overwrites rules specified from the extended configs
        'no-console': 'warn',
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-alert': 'warn',
        'no-floating-decimal': 'error',

        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-interface': 'off',

        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',

        'react/display-name': 'off',
        'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
        'react/prop-types': 'off',

        'react-hooks/exhaustive-deps': 'off',
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
