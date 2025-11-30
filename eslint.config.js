import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
    {
        ignores: ['node_modules', 'build', 'reports'],
    },
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        extends: [
            ...tseslint.configs.recommendedTypeChecked,
            pluginReact.configs.flat.recommended,
            pluginReact.configs.flat['jsx-runtime'],
            pluginReactHooks.configs.flat.recommended,
            eslintConfigPrettier,
        ],
        rules: {
            'react/prop-types': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: false,
                },
            ],
            '@typescript-eslint/strict-boolean-expressions': [
                'error',
                {
                    allowAny: false,
                    allowNumber: false,
                    allowNullableNumber: false,
                    allowString: true,
                    allowNullableString: true,
                    allowNullableBoolean: true,
                    allowNullableObject: true,
                    allowNullableEnum: false,
                },
            ],
            'no-console': 'warn',
            eqeqeq: ['error', 'always'],
        },
    },
]);
