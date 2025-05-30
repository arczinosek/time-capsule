import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';

import { Milestone } from '@/domain/entities/milestone.entity';
import { MilestoneRepository } from '@/infrastructure/repositories/milestone.repository';

import { FindMilestonesQuery } from '../queries';
import { FindMilestonesHandler } from './find-milestones.handler';

describe('FindMilestonesHandler', () => {
  let repositoryMock: DeepMocked<MilestoneRepository>;
  let loggerMock: DeepMocked<Logger>;
  let handler: FindMilestonesHandler;

  beforeEach(() => {
    repositoryMock = createMock<MilestoneRepository>();
    loggerMock = createMock<Logger>();
    handler = new FindMilestonesHandler(repositoryMock, loggerMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handle', () => {
    it.each([
      {
        page: 1,
        limit: 5,
        expectedSkip: 0,
      },
      {
        page: 2,
        limit: 10,
        expectedSkip: 10,
      },
      {
        page: 3,
        limit: 15,
        expectedSkip: 30,
      },
    ])(
      'should call repository with correct parameters (#$#)',
      async ({ page, limit, expectedSkip }) => {
        const expectedResult = [
          Milestone.create('title', 'description', new Date(), new Date()),
        ];

        const query = new FindMilestonesQuery(page, limit);

        const findSpy = jest
          .spyOn(repositoryMock, 'find')
          .mockResolvedValueOnce(expectedResult);

        const result = await handler.handle(query);

        expect(result).toStrictEqual(expectedResult);
        expect(findSpy).toHaveBeenCalledWith({
          take: limit,
          skip: expectedSkip,
        });
      }
    );

    it('should log warn and throw error when repository throws error', async () => {
      const logWarnSpy = jest.spyOn(loggerMock, 'warn');
      const query = new FindMilestonesQuery();

      repositoryMock.find.mockRejectedValueOnce(new Error('database error'));

      await expect(handler.handle(query)).rejects.toThrow();

      expect(logWarnSpy).toHaveBeenCalled();
    });
  });
});
