module.exports = {
  verbose: true,
  moduleFileExtensions: ['js'],
  testMatch: ['**/tests/lighthouse/**/?(*.)test.js'],
  roots: ['<rootDir>'],
  testTimeout: 1500000,
  reporters: [
    'default',

    [
      'jest-html-reporter',
      {
        pageTitle: 'Performance Testing - DigiTalent_Commerce',
        outputPath: './perf-test/lighthouse-report.html',
        append: false
      }
    ]
  ]
};
