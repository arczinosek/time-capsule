import { faker } from '@faker-js/faker';

import { FindMilestonesQuery } from './find-milestones.query';

describe('FindMilestonesQuery', () => {
  it('should create with default parameters', () => {
    const query = new FindMilestonesQuery();

    expect(query.page).toBe(1);
    expect(query.limit).toBe(10);
  });

  it('should throw Error when limit is less than 1', () => {
    const page = 1;
    const limit = faker.number.int({ max: 0 });

    expect(() => new FindMilestonesQuery(page, limit)).toThrow(
      new Error(`Parameter 'limit' is less than 1`)
    );
  });

  it('should throw Error when limit is greated than allowed max value', () => {
    const page = 1;
    const limit = faker.number.int({ min: 26 });

    expect(() => new FindMilestonesQuery(page, limit)).toThrow(
      new Error(`Parameter 'limit' is greater than allowed '25'`)
    );
  });

  it('should throw Error when page is less than 1', () => {
    const page = faker.number.int({ max: 0 });

    expect(() => new FindMilestonesQuery(page)).toThrow(
      new Error(`Parameter 'page' is not positive`)
    );
  });
});
