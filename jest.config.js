module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/.+\\.js$'],
    moduleNameMapper: {
        '\\.css$': '<rootDir>/jest.mock.js',
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['core-js', '<rootDir>/src/jest-setup.ts'],
    testEnvironment: 'jsdom',
    coverageReporters: ['html'],
    coverageDirectory: '<rootDir>/build/coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
