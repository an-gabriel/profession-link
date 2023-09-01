module.exports = {
  rootDir: './',
  testMatch: ['<rootDir>/tests/modules/**/**/*.test.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  resetModules: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};
