// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
    _comment:
        "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
    packageManager: 'pnpm',
    reporters: ['html', 'progress'],
    testRunner: 'jest',
    checkers: ['typescript'],
    tsconfigFile: 'tsconfig.json',
    testRunner_comment:
        'Take a look at https://stryker-mutator.io/docs/stryker-js/jest-runner for information about the jest plugin.',
    coverageAnalysis: 'perTest',
    incremental: true,
    ignoreStatic: true,
    plugins: [
        '@stryker-mutator/jest-runner',
        '@stryker-mutator/typescript-checker',
    ],
};
export default config;
