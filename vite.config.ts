import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command }): UserConfig => {
    const commonConfig: UserConfig = {
        plugins: [
            tsconfigPaths(),
            react(),
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
            },
        };
    }
});
