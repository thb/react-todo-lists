module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript files
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for browser-like testing
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Setup file for Jest-DOM
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // Ignore transformations in node_modules except for axios if needed
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$', // Match test files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Supported file extensions
};
