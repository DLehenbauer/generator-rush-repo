module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",

    // Workaround 'jest' writing test results to stderr, even on success.
    // (See: https://github.com/facebook/jest/issues/5064)
    reporters: ["jest-standard-reporter"],
};
