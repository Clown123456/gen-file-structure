module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};