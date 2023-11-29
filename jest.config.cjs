/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  coveragePathIgnorePatterns: [
    "src/index.ts",
    "src/database/index.ts",
    "src/server/app.ts",
    "src/setupTests.ts",
  ],
};
