import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
const { compilerOptions } = require('../tsconfig');
const path = require('path');

const config: Config = {
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: path.join(__dirname, '..'),
    }),
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '.e2e-spec.ts$',
  transform: {
    '\\.ts$': 'ts-jest',
  },
};

export default config;
