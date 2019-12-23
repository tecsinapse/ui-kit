module.exports = {
  roots: ['./__tests__'],
  displayName: 'picker-tests',
  testMatch: ['**/__tests__/**/*.test.js'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['/node_modules/(?!@tecsinapse/ui-kit).+\\.js$'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
