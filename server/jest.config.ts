export default {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*ts'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
