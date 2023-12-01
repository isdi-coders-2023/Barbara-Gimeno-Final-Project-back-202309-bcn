/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.{ts, tsx}",
    "!**node_modules/**",
    "!src/index.ts",
    "!**/types.ts",
    "!src/setupTests.ts",
    "!src/server/app.ts",
    "!src/database/index.ts",
  ],
};
