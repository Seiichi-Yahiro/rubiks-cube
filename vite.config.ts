import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command }): UserConfig => {
    const commonConfig: UserConfig = {
        plugins: [
            tsconfigPaths(),
            react({
                babel: {
                    plugins: ['babel-plugin-react-compiler'],
                },
            }),
            checker({
                typescript: true,
                eslint: {
                    lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
                    useFlatConfig: true,
                },
            }),
        ],
    };

    if (command === 'serve') {
        return {
            ...commonConfig,
            server: {
                port: 3000,
            },
        };
    } else {
        // command === 'build'
        return {
            ...commonConfig,
            build: {
                outDir: './build',
                rollupOptions: {
                    output: {
                        manualChunks: {
                            react: ['react', 'react-dom'],
                            redux: [
                                'react-redux',
                                'redux',
                                'redux-logger',
                                '@reduxjs/toolkit',
                            ],
                            i18n: [
                                'react-i18next',
                                'i18next',
                                'i18next-browser-languagedetector',
                            ],
                            lodash: ['lodash'],
                            parsimmon: ['parsimmon'],
                            components: [
                                '@radix-ui/react-dialog',
                                '@radix-ui/react-popover',
                                '@radix-ui/react-scroll-area',
                                '@radix-ui/react-select',
                                '@radix-ui/react-slider',
                                '@radix-ui/react-switch',
                                '@radix-ui/react-tabs',
                                '@radix-ui/react-tooltip',
                                'lucide-react',
                                '@uiw/color-convert',
                                '@uiw/react-color-chrome',
                            ],
                        },
                    },
                },
            },
        };
    }
});
