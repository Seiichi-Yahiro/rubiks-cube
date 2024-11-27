import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, type ViteUserConfig } from 'vitest/config';

export default defineConfig(({ command }): ViteUserConfig => {
    const commonConfig: ViteUserConfig = {
        plugins: [
            tsconfigPaths(),
            react(),
            checker({
                typescript: true,
                /*eslint: {
                    lintCommand: 'eslint "./src/!**!/!*.{ts,tsx}"',
                },*/
            }),
        ],
    };

    if (command === 'serve') {
        return {
            ...commonConfig,
            server: {
                port: 3000,
            },
            test: {
                setupFiles: ['./src/test-setup.ts'],
                environment: 'jsdom',
                coverage: {
                    provider: 'v8',
                    reporter: ['html'],
                    reportsDirectory: './reports/coverage',
                    include: ['src/**'],
                },
            },
        };
    } else {
        // command === 'build'
        return {
            ...commonConfig,
            build: {
                outDir: './build',
            },
        };
    }
});
