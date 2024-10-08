import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/test.{ts,tsx}'],
  transform: {
    "^.+\\.css$": "jest-transform-css",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/file.parser.cjs",
  },
  moduleNameMapper: {
    '^images': '<rootDir>/src/assets/img',
    '^sounds': '<rootDir>/src/assets/sounds',
    '^features/(.*)': [
      '<rootDir>/src/features/game/model',
      '<rootDir>/src/features/game/view',
      '<rootDir>/src/features/game/utils',
    ],
    '^pages': '<rootDir>/src/pages',
    '^components': '<rootDir>/src/shared/components',
    '^themes': '<rootDir>/src/shared/themes',
    '^utils': '<rootDir>/src/shared/utils',
    '^validators': '<rootDir>/src/shared/validation'
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
