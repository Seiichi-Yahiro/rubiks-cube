// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
    packageManager: 'pnpm',
    reporters: ['html', 'progress'],
    testRunner: 'vitest',
    vitest: {
        configFile: 'vitest.config.ts',
        dir: 'src',
    },
    checkers: ['typescript'],
    tsconfigFile: 'tsconfig.json',
    coverageAnalysis: 'perTest',
    incremental: true,
    ignoreStatic: true,
    plugins: [
        '@stryker-mutator/vitest-runner',
        '@stryker-mutator/typescript-checker',
    ],
    concurrency: 4,
};
export default config;
