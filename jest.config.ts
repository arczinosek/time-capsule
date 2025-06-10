import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
const { compilerOptions } = require('./tsconfig');

const config: Config = {
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    }),
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFiles: ['reflect-metadata'],
};

export default config;
