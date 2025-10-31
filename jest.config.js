/** @type {import('jest').Config} */
module.exports = {
  // Root configuration - individual projects should extend this
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.(test|spec).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/__tests__/**",
    "!**/coverage/**",
    "!**/dist/**",
    "!**/build/**",
    "!**/.expo/**",
    "!**/.next/**",
    "!**/.turbo/**",
    "!**/.tamagui/**",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/", "/coverage/", "/dist/", "/build/"],
};
