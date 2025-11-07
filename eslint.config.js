import pluginJs from '@eslint/js';
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
        plugins: { js: pluginJs },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    {
        rules: {
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
            'no-console': 'warn',
            eqeqeq: ['error', 'always'],
        },
    },
    pluginReact.configs.flat.recommended,
    pluginReactHooks.configs.flat.recommended,
    eslintConfigPrettier,
]);
