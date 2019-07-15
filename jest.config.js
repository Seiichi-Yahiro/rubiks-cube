module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '\\.s?css$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['<rootDir>src/setupTests.tsx'],
    testEnvironment: 'jsdom',
    coverageReporters: ['html'],
    coverageDirectory: '<rootDir>build/coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}']
};
