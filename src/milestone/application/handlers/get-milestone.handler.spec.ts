import { faker } from '@faker-js/faker';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';

import { Milestone } from '../../domain/entities/milestone.entity';
import { MilestoneRepository } from '../../infrastructure/repositories/milestone.repository';
import { GetMilestoneQuery } from '../queries';
import { GetMilestoneHandler } from './get-milestone.handler';

describe('GetMilestoneHandler', () => {
  let repositoryMock: DeepMocked<MilestoneRepository>;
  let loggerMock: DeepMocked<Logger>;
  let handler: GetMilestoneHandler;

  beforeEach(() => {
    repositoryMock = createMock<MilestoneRepository>();
    loggerMock = createMock<Logger>();
    handler = new GetMilestoneHandler(repositoryMock, loggerMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handle', () => {
    it.each([Milestone.create('title', 'desc', new Date(), new Date()), null])(
      'should return repository result',
      async (expectedResult) => {
        const findSpy = jest
          .spyOn(repositoryMock, 'findOneBy')
          .mockResolvedValueOnce(expectedResult);
        const query = new GetMilestoneQuery(faker.number.int({ min: 1 }));

        const result = await handler.handle(query);

        expect(result).toBe(expectedResult);
        expect(findSpy).toHaveBeenCalledWith({ id: query.id });
      }
    );

    it('should throw Error when repository rejects', async () => {
      const findSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockRejectedValueOnce(new Error('repository error'));
      const logWarnSpy = jest.spyOn(loggerMock, 'warn');
      const query = new GetMilestoneQuery(faker.number.int({ min: 1 }));

      await expect(handler.handle(query)).rejects.toThrow();
      expect(findSpy).toHaveBeenCalledWith({ id: query.id });
      expect(logWarnSpy).toHaveBeenCalled();
    });
  });
});
