import { faker } from '@faker-js/faker';

import { InvalidPeriodError } from '../errors';
import { Milestone } from './milestone.entity';

describe('Milestone', () => {
  const createValidMilestone = () =>
    Milestone.create(
      'title',
      'description',
      new Date('2025-05-01'),
      new Date('2025-05-03')
    );

  describe('create', () => {
    it('should throw Error when title is empty', () => {
      expect(() =>
        Milestone.create('', 'desc', new Date(), new Date())
      ).toThrow(new Error('title can not be empty'));
    });

    it('should throw Error when title is too long', () => {
      const title = faker.string.sample({ min: 128, max: 256 });

      expect(() => Milestone.create(title, '', new Date(), new Date())).toThrow(
        new Error(`title is longer than allowed '127'`)
      );
    });

    it('should throw InvalidPeriodError when finishDate is before startDate', () => {
      expect(() =>
        Milestone.create(
          'title',
          '',
          new Date('2025-05-30'),
          new Date('2025-05-29')
        )
      ).toThrow(new InvalidPeriodError());
    });
  });

  describe('updateTitle', () => {
    let milestone: Milestone;

    beforeEach(() => {
      milestone = createValidMilestone();
    });

    it('should throw Error when new title is empty', () => {
      expect(() => milestone.updateTitle('')).toThrow(
        new Error('title can not be empty')
      );
    });

    it('should throw Error when new title is too long', () => {
      const tooLongTitle = faker.string.symbol({ min: 128, max: 256 });

      expect(() => milestone.updateTitle(tooLongTitle)).toThrow(
        new Error(`title is longer than allowed '127'`)
      );
    });
  });

  describe('updatePeriod', () => {
    it('should throw InvalidPeriodError when finishDate is before startDate', () => {
      const milestone = createValidMilestone();
      const start = faker.date.past();
      const finish = faker.date.recent({ refDate: start });

      expect(() => milestone.updatePeriod(start, finish)).toThrow(
        new InvalidPeriodError()
      );
    });
  });
});
