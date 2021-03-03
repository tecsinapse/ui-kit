module.exports = {
  roots: ['./__tests__', './packages'],
  displayName: 'tests',
  testMatch: ['**/__tests__/**/*.test.js', '*.test.js'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['/node_modules/(?!@tecsinapse/ui-kit).+\\.js$'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleDirectories: [
    'node_modules',
    'utils',
    'packages/wizard/src',
    'packages/uploader/src',
    'packages/ui-kit/src',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/packages/*/build/',
    '<rootDir>/packages/*/stories/',
  ],
};
