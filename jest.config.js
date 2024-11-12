module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/.+\\.js$'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['core-js'],
    testEnvironment: 'jsdom',
    coverageReporters: ['html'],
    coverageDirectory: '<rootDir>build/coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
