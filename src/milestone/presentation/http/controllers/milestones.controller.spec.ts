import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';

import { CreateMilestoneCommand } from '../../../application/commands';
import { CreateMilestoneHandler } from '../../../application/handlers/create-milestone.handler';
import { FindMilestonesHandler } from '../../../application/handlers/find-milestones.handler';
import { GetMilestoneHandler } from '../../../application/handlers/get-milestone.handler';
import {
  FindMilestonesQuery,
  GetMilestoneQuery,
} from '../../../application/queries';
import { Milestone } from '../../../domain/entities/milestone.entity';
import { InvalidPeriodError } from '../../../domain/errors';
import { FindMilestonesRequest } from '../requests';
import { MilestoneResponse } from '../responses';
import { MilestonesController } from './milestones.controller';

describe('MilestonesController', () => {
  let createMilestoneHandlerMock: DeepMocked<CreateMilestoneHandler>;
  let findMilestonesHandlerMock: DeepMocked<FindMilestonesHandler>;
  let getMilestoneHandlerMock: DeepMocked<GetMilestoneHandler>;
  let loggerMock: DeepMocked<Logger>;
  let controller: MilestonesController;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    createMilestoneHandlerMock = createMock<CreateMilestoneHandler>();
    findMilestonesHandlerMock = createMock<FindMilestonesHandler>();
    getMilestoneHandlerMock = createMock<GetMilestoneHandler>();
    loggerMock = createMock<Logger>();
    controller = new MilestonesController(
      createMilestoneHandlerMock,
      findMilestonesHandlerMock,
      getMilestoneHandlerMock,
      loggerMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('find', () => {
    it('should return array with MilestoneResponse for every found milestone', async () => {
      const firstEventDate = new Date('2025-05-10');
      const secondEventDate = new Date('2025-05-28');

      const firstEvent = Milestone.create(
        'first found',
        '',
        firstEventDate,
        firstEventDate
      );
      const secondEvent = Milestone.create(
        'second found',
        'desc',
        secondEventDate,
        secondEventDate
      );

      const findHandlerSpy = jest
        .spyOn(findMilestonesHandlerMock, 'handle')
        .mockResolvedValueOnce([firstEvent, secondEvent]);

      const request = new FindMilestonesRequest();

      const expectedResponse = {
        milestones: [
          MilestoneResponse.createFromEntity(firstEvent),
          MilestoneResponse.createFromEntity(secondEvent),
        ],
      };

      const response = await controller.find(request);

      expect(response).toStrictEqual(expectedResponse);
      expect(findHandlerSpy).toHaveBeenCalledWith(
        new FindMilestonesQuery(request.page, request.limit)
      );
    });
  });

  describe('get', () => {
    it('should return MilestoneResponse when handler return entity', async () => {
      const entity = Milestone.create(
        'title',
        'description',
        new Date(),
        new Date()
      );
      const expectedResponse = MilestoneResponse.createFromEntity(entity);

      const handlerSpy = jest
        .spyOn(getMilestoneHandlerMock, 'handle')
        .mockResolvedValueOnce(entity);

      const result = await controller.get(23);

      expect(result).toStrictEqual(expectedResponse);
      expect(handlerSpy).toHaveBeenCalledWith(new GetMilestoneQuery(23));
    });

    it('should throw NotFoundException when handler return null', async () => {
      const handlerSpy = jest
        .spyOn(getMilestoneHandlerMock, 'handle')
        .mockResolvedValueOnce(null);

      await expect(controller.get(59)).rejects.toThrow(
        new NotFoundException('Milestone not found!')
      );
      expect(handlerSpy).toHaveBeenCalledWith(new GetMilestoneQuery(59));
    });
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
        .spyOn(createMilestoneHandlerMock, 'handle')
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
        .spyOn(createMilestoneHandlerMock, 'handle')
        .mockRejectedValueOnce(new InvalidPeriodError());

      await expect(controller.create(request)).rejects.toThrow(
        BadRequestException
      );
    });
  });
});
