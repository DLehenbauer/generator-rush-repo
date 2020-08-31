module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    // Workaround 'jest' writing test results to stderr, even on success.
    // (See: https://github.com/facebook/jest/issues/5064)
    reporters: ["jest-standard-reporter"],

    // Work around issue locating package root when 'ts-jest' is symlinked.
    // (See: https://github.com/kulshekhar/ts-jest/issues/823)
    globals: {
        'ts-jest': { packageJson: 'package.json', },
    },
};
