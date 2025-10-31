/** @type {import('jest').Config} */
module.exports = {
  displayName: "mobile",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"],
  testMatch: ["**/__tests__/**/*.(test|spec).[jt]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react",
        },
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(tamagui|@tamagui)/)"],
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "style/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/__tests__/**",
    "!**/coverage/**",
    "!**/.expo/**",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__tests__/__mocks__/fileMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
