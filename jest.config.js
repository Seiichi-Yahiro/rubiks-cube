module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!bs-platform|tablecloth-bucklescript|re-parse).+\\.js$',
    ],
    moduleNameMapper: {
        '\\.s?css$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['core-js'],
    testEnvironment: 'jsdom',
    coverageReporters: ['html'],
    coverageDirectory: '<rootDir>build/coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
