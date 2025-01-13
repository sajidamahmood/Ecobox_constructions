module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Correct configuration
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // To handle JSX/TSX files
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|bmp|svg|webp)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
  },
  testEnvironment: 'jest-environment-jsdom', // Set the test environment to jsdom
  testTimeout: 10000, // Adjust timeout if needed
};
