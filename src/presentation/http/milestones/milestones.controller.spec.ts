import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException, Logger } from '@nestjs/common';

import { CreateMilestoneHandler } from '@/application/handlers/create-milestone.handler';

import { MilestonesController } from './milestones.controller';
import { Milestone } from '@/domain/entities/milestone.entity';
import { MilestoneResponse } from '../responses';
import { CreateMilestoneCommand } from '@/application/commands';
import { InvalidPeriodError } from '@/domain/errors';

describe('MilestonesController', () => {
  let handlerMock: DeepMocked<CreateMilestoneHandler>;
  let loggerMock: DeepMocked<Logger>;
  let controller: MilestonesController;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    handlerMock = createMock<CreateMilestoneHandler>();
    loggerMock = createMock<Logger>();
    controller = new MilestonesController(handlerMock, loggerMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('create', () => {
    it('should return MilestoneResponse when created successfully', async () => {
      const request = {
        title: 'Awesome family event',
        description: 'It was an unforgettable event',
        dateStart: '2025-05-27',
        dateFinish: '2025-05-27',
      };

      const milestoneEntity = Milestone.create(
        request.title,
        request.description,
        new Date(request.dateStart),
        new Date(request.dateFinish)
      );

      const expectedResponse =
        MilestoneResponse.createFromEntity(milestoneEntity);

      const handleSpy = jest
        .spyOn(handlerMock, 'handle')
        .mockResolvedValueOnce(milestoneEntity);

      const response = await controller.create(request);

      expect(response).toStrictEqual(expectedResponse);
      expect(handleSpy).toHaveBeenCalledTimes(1);
      expect(handleSpy).toHaveBeenCalledWith(
        new CreateMilestoneCommand(
          request.title,
          request.description,
          new Date(request.dateStart),
          new Date(request.dateFinish)
        )
      );
    });

    it('should throw BadRequestException when InvalidPeriodError is thrown', async () => {
      const request = {
        title: 'Awesome family event',
        description: 'It was an unforgettable event',
        dateStart: '2025-05-28',
        dateFinish: '2025-05-27',
      };

      jest
        .spyOn(handlerMock, 'handle')
        .mockRejectedValueOnce(new InvalidPeriodError());

      await expect(controller.create(request)).rejects.toThrow(
        BadRequestException
      );
    });
  });
});
