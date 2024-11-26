import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
    plugins: [tsconfigPaths(), react()],
});
