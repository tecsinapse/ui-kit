module.exports = {
  roots: ['./__tests__', './packages'],
  displayName: 'tests',
  testMatch: ['**/__tests__/**/*.test.js', '*.test.js'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['/node_modules/(?!@tecsinapse/ui-kit).+\\.js$'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
