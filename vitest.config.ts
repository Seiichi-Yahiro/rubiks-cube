import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
    mergeConfig(
        viteConfig(configEnv),
        defineConfig({
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
        }),
    ),
);
