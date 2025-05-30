import { FindMilestonesQuery } from './find-milestones.query';

describe('FindMilestonesQuery', () => {
  it('should throw Error when limit is less than 1', () => {
    expect(() => new FindMilestonesQuery(1, 0)).toThrow(
      new Error(`Parameter 'limit' is less than 1`)
    );
  });

  it('should throw Error when limit is greated than allowed max value', () => {
    expect(() => new FindMilestonesQuery(1, 26)).toThrow(
      new Error(`Parameter 'limit' is greater than allowed '25'`)
    );
  });

  it('should throw Error when page is less than 1', () => {
    expect(() => new FindMilestonesQuery(0)).toThrow(
      new Error(`Parameter 'page' is not positive`)
    );
  });
});
